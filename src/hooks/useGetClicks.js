import { getClicksForUrls } from "@/db/apiClicks";
import { useQuery } from "@tanstack/react-query";

export const useGetClicks = (url_ids) => {
  return useQuery({
    queryKey: ["clicksForUrls", url_ids],
    queryFn: () => getClicksForUrls(url_ids),
    enabled: Array.isArray(url_ids) && url_ids.length > 0,
  });
};
