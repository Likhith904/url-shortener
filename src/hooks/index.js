import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser, logout, signup, login } from "@/db/apiAuth";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: getCurrentUser,
  });
};
export const useSupabaseLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
export const useSupabaseSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};
export const useSupabaseLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
