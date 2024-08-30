/* eslint-disable react-hooks/rules-of-hooks */
import { UserState } from "@/context/userContext";
import { useGetLongUrl } from "@/hooks/useGetLongUrl";
import { useStoreClicks } from "@/hooks/useStoreClicks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import Error from "@/components/error";
const redirectLink = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id } = useParams();
  const { user } = UserState();
  const {
    data,
    isLoading,
    error,
    refetch: longUrlFetch,
  } = useGetLongUrl({
    short_url: id,
  });

  const { isFetching: loadingStats, mutate } = useStoreClicks({
    url_id: data?.id,
    original_url: data?.original_url,
  });

  useEffect(() => {
    if (id !== undefined) longUrlFetch();
  }, []);

  useEffect(() => {
    if (!isLoading && data && data.id) {
      mutate();
    }
  }, [data, isLoading, mutate]);

  if (error) {
    return <Error message={error.message} />;
  }

  if (isLoading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting to {data?.original_url}
      </>
    );
  }
  //   return (
  //     <div>
  //       {id} link: {data?.original_url}redirect-link
  //     </div>
  //   );

  return null;
};

export default redirectLink;
