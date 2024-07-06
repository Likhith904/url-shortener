import { getClicksForUrls } from "@/db/apiClicks";
import { useQuery } from "@tanstack/react-query";

export const useGetClicks = (user_ids) => {
  return useQuery({
    queryKey: ["clicksForUrls", user_ids],
    queryFn: () => getClicksForUrls(user_ids),
    enabled: Array.isArray(user_ids) && user_ids.length > 0,
  });
};
