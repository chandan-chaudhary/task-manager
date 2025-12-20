import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/services/api";
import { useEffect } from "react";
import { socketEvents } from "@/lib/socket";
import { useSocket } from "@/context/SocketContext";

// Custom hook for fetching dashboard statistics.

export function useDashboardStats() {
  const queryClient = useQueryClient();
  const { isConnected } = useSocket();

  const query = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const response = await dashboardService.getStats();
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
    staleTime: 30000, // 30 seconds
  });

  // Listen for real-time task updates to refresh dashboard stats
  useEffect(() => {
    if (!isConnected) return;

    const handleTaskUpdate = () => {
      console.log("Real-time: Refreshing dashboard stats");
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    };

    socketEvents.onTaskCreated(handleTaskUpdate);
    socketEvents.onTaskUpdated(handleTaskUpdate);
    socketEvents.onTaskDeleted(handleTaskUpdate);
    socketEvents.onTaskAssigned(handleTaskUpdate);

    return () => {
      socketEvents.off("task:created");
      socketEvents.off("task:updated");
      socketEvents.off("task:deleted");
      socketEvents.off("task:assigned");
    };
  }, [isConnected, queryClient]);

  return query;
}
