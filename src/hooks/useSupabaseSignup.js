import { useMutation } from "@tanstack/react-query";
import { signup } from "@/db/apiAuth";
export const useSupabaseSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};
