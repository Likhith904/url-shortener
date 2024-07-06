import { getUrls } from "@/db/apiUrls";
import { useQuery } from "@tanstack/react-query";

export const useGetUrls = (user_id) => {
  return useQuery({
    queryKey: ["urls", user_id],
    queryFn: () => getUrls(user_id),
  });
};
