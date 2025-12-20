import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/api";
import { useEffect } from "react";
import { socketEvents } from "@/lib/socket";
import { useSocket } from "@/context/SocketContext";
import { toast } from "sonner";


const NOTIFICATIONS_KEY = ["notifications"];

export function useNotifications() {
  const queryClient = useQueryClient();
  const { isConnected } = useSocket();

  const query = useQuery({
    queryKey: NOTIFICATIONS_KEY,
    queryFn: async () => {
      const response = await notificationService.getNotifications();
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
    refetchInterval: 30000,
  });

  // Listen for real-time notifications
  useEffect(() => {
    if (!isConnected) return;

    socketEvents.onNotificationCreated((data) => {
      console.log("Real-time: Notification received", data.notification);
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY });

      const notification = data.notification as { message: string };
      toast.info("New Notification", {
        description: notification.message,
      });
    });

    socketEvents.onTaskAssigned((data) => {
      console.log("Real-time: Task assigned to you", data.task);
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY });

      const task = data.task as { title: string };
      toast.success("New Task Assigned!", {
        description: `You have been assigned: ${task.title}`,
        duration: 5000,
      });
    });

    return () => {
      socketEvents.off("notification:created");
      socketEvents.off("task:assigned");
    };
  }, [isConnected, queryClient]);

  return query;
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await notificationService.markAsRead(id);
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await notificationService.markAllAsRead();
      if (response.error) throw new Error(response.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY });
    },
  });
}
