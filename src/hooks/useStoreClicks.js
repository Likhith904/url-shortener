import { storeClicks } from "@/db/apiClicks";
import { useMutation } from "@tanstack/react-query";

export const useStoreClicks = ({ url_id, original_url }) => {
  return useMutation({
    mutationKey: ["urls", { url_id, original_url }],
    mutationFn: () => storeClicks({ url_id, original_url }),
    onSuccess: () => console.log("stored clicks successfully"),
  });
};
