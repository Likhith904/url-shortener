import { useMutation } from "@tanstack/react-query";
import { login } from "@/db/apiAuth";
export const useSupabaseLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
