import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/db/apiAuth";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: "userDetails",
    queryFn: getCurrentUser,
  });
};
