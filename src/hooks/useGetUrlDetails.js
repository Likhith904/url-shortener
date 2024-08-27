import { getUrl } from "@/db/apiUrls";
import { useQuery } from "@tanstack/react-query";

export const useGetUrlDetails = ({ id, user_id }) => {
  return useQuery({
    queryKey: ["urls", { id, user_id }],
    queryFn: () => getUrl({ id, user_id }),
  });
};
