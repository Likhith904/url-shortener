import { useMutation } from "@tanstack/react-query";
import { logout } from "@/db/apiAuth";
export const useSupabaseLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
