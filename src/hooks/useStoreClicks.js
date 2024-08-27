import { storeClicks } from "@/db/apiClicks";
import { useQuery } from "@tanstack/react-query";

export const useStoreClicks = ({ url_id, original_url }) => {
  return useQuery({
    queryKey: ["urls", { url_id, original_url }],
    queryFn: () => storeClicks({ url_id, original_url }),
  });
};
