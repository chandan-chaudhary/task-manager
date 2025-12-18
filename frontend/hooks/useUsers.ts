import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/api";

/**
 * Custom hook for fetching users (used for task assignment).
 */

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await userService.getUsers();
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
    staleTime: 60000, // 1 minute
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await userService.getUser(id);
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
    enabled: !!id,
  });
}
