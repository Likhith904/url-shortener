import { getClicksForSingleUrl } from "@/db/apiClicks";
import { useQuery } from "@tanstack/react-query";

export const useGetClickStats = ({ url_id }) => {
  return useQuery({
    queryKey: ["urls", url_id],
    queryFn: () => getClicksForSingleUrl({ url_id }),
  });
};
