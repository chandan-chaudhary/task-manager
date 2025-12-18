import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/api";

/**
 * Custom hook for fetching dashboard statistics.
 */

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const response = await dashboardService.getStats();
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
    staleTime: 30000, // 30 seconds
  });
}
