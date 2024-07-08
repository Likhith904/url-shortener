import { createUrls } from "@/db/apiUrls";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useCreateUrl = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createUrls"],
    mutationFn: createUrls,
    onSuccess: () => {
      queryClient.invalidateQueries("urls");
    },
  });
};
