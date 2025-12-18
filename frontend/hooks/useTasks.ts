import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/api";
import type {
  TaskFilters,
  TaskSort,
  CreateTaskDto,
  UpdateTaskDto,
} from "@/types";
import { toast } from "sonner";

/**
 * Custom hook for managing tasks with React Query.
 * Provides caching, optimistic updates, and automatic refetching.
 */

const TASKS_KEY = ["tasks"];

export function useTasks(filters?: TaskFilters, sort?: TaskSort) {
  return useQuery({
    queryKey: [...TASKS_KEY, filters, sort],
    queryFn: async () => {
      const response = await taskService.getTasks(filters, sort);
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
    staleTime: 30000, // 30 seconds
  });
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
