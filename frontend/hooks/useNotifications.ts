import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/api";

/**
 * Custom hook for managing notifications with React Query.
 */

const NOTIFICATIONS_KEY = ["notifications"];

export function useNotifications() {
  return useQuery({
    queryKey: NOTIFICATIONS_KEY,
    queryFn: async () => {
      const response = await notificationService.getNotifications();
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
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
