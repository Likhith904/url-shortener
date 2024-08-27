import { getLongUrl } from "@/db/apiUrls";
import { useQuery } from "@tanstack/react-query";

export const useGetLongUrl = (id) => {
  return useQuery({
    queryKey: ["urls", id],
    queryFn: () => getLongUrl(id),
  });
};
