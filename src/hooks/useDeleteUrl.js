import { deleteUrls } from "@/db/apiUrls";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteUrls = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteUrls"],
    mutationFn: (urlId) => deleteUrls(urlId),
    onSuccess: () => {
      queryClient.invalidateQueries("urls");
    },
  });
};
