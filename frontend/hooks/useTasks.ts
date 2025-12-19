import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/api";
import type {
  TaskFilters,
  TaskSort,
  CreateTaskDto,
  UpdateTaskDto,
} from "@/types";
import { toast } from "sonner";
import { useEffect } from "react";
import { socketEvents } from "@/lib/socket";
import { useSocket } from "@/context/SocketContext";

/**
 * Custom hook for managing tasks with React Query.
 * Provides caching, optimistic updates, and automatic refetching.
 */

const TASKS_KEY = ["tasks"];

export function useTasks(filters?: TaskFilters, sort?: TaskSort) {
  const queryClient = useQueryClient();
  const { isConnected } = useSocket();

  const query = useQuery({
    queryKey: [...TASKS_KEY, filters, sort],
    queryFn: async () => {
      const response = await taskService.getTasks(filters, sort);
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
    staleTime: 30000, // 30 seconds
  });

  // Listen for real-time task updates
  useEffect(() => {
    if (!isConnected) return;

    // Handle task created
    socketEvents.onTaskCreated((data) => {
      console.log("Real-time: Task created", data.task);
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
    });

    // Handle task updated
    socketEvents.onTaskUpdated((data) => {
      console.log("Real-time: Task updated", data.taskId, data.task);
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
    });

    // Handle task deleted
    socketEvents.onTaskDeleted((data) => {
      console.log("Real-time: Task deleted", data.taskId);
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
    });

    // Handle task assigned
    socketEvents.onTaskAssigned((data) => {
      console.log("Real-time: Task assigned", data.task);
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
    });

    // Cleanup listeners on unmount
    return () => {
      socketEvents.off("task:created");
      socketEvents.off("task:updated");
      socketEvents.off("task:deleted");
      socketEvents.off("task:assigned");
    };
  }, [isConnected, queryClient]);

  return query;
}

export function useTask(id: string) {
  return useQuery({
    queryKey: [...TASKS_KEY, id],
    queryFn: async () => {
      const response = await taskService.getTask(id);
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
    enabled: !!id,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTaskDto) => {
      const response = await taskService.createTask(data);
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: (newTask) => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      toast.success("Task created", {
        description: `"${newTask.title}" has been added`,
      });
    },
    onError: (error: Error) => {
      toast.error("Failed to create task", {
        description: error.message,
      });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTaskDto }) => {
      const response = await taskService.updateTask(id, data);
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      toast.success("Task updated", {
        description: `"${updatedTask.title}" has been updated`,
      });
    },
    onError: (error: Error) => {
      toast.error("Failed to update task", {
        description: error.message,
      });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await taskService.deleteTask(id);
      if (response.error) throw new Error(response.error);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      toast.success("Task deleted", {
        description: "The task has been removed",
      });
    },
    onError: (error: Error) => {
      toast.error("Failed to delete task", {
        description: error.message,
      });
    },
  });
}
