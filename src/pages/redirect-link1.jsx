import { useGetLongUrl } from "@/hooks/useGetLongUrl";
import { useStoreClicks } from "@/hooks/useStoreClicks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
// import { useState } from "react";
const RedirectLink = () => {
  const { id } = useParams();
  const { isLoading, data, refetch: getLongUrl } = useGetLongUrl(id);
  const { isLoading: loadingStats, refetch: getStats } = useStoreClicks({
    user_id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    if (data) {
      getLongUrl();
      console.log(data);
      window.location.href = data.original_url;
    }
  }, [data, getLongUrl, id]);
  // const [fetchError, setFetchError] = useState(null);

  // useEffect(() => {
  //   if (id) {
  //     const fetchData = async () => {
  //       try {
  //         const longUrlData = await getLongUrl();
  //         if (longUrlData) {
  //           // Redirect to the long URL
  //           window.location.href = longUrlData.original_url;
  //         }
  //       } catch (err) {
  //         setFetchError(err);
  //       }
  //     };

  //     fetchData();
  //   } else {
  //     setFetchError(new Error("Invalid URL or ID not provided."));
  //   }
  // }, [id, getLongUrl]);

  // useEffect(() => {
  //   if (!isLoading && data) {
  //     getStats();
  //   }
  // }, [data, getStats, isLoading]);

  // if (fetchError) {
  //   return (
  //     <div>
  //       <h1>Error</h1>
  //       <p>
  //         Cannot fetch the long URL or the URL you entered might be invalid.
  //       </p>
  //       <p>{fetchError.message}</p>
  //     </div>
  //   );
  // }

  if (!data) {
    return <div>Error fetching URL:</div>;
  }

  if (isLoading) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        {id}
        Redirecting....
      </>
    );
  }
  return null;
};

export default RedirectLink;
