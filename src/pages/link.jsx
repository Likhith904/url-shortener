import { Button } from "@/components/ui/button";
import { UserState } from "@/context/userContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteUrls } from "@/hooks/useDeleteUrl";
import { useGetClickStats } from "@/hooks/useGetClickStats";
import { useGetUrlDetails } from "@/hooks/useGetUrlDetails";
import { Copy, ClipboardCheck, Loader } from "lucide-react";
import { Download } from "lucide-react";
import { Trash } from "lucide-react";
import { LinkIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { saveAs } from "file-saver";
import { redirect } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LinkPage = () => {
  const [copied, setCopied] = useState(false);
  const [download, setDownload] = useState(false);
  const { id } = useParams();
  const { user } = UserState();
  const navigate = useNavigate();
  const handleDownload = async () => {
    const imageUrl = data?.qr_code;
    const fileName = data?.title;

    try {
      setDownload(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      saveAs(blob, fileName);
      setDownload(false);
      // const a = document.createElement("a");
      // a.href = blob;
      // a.download = fileName + ".jpg";

      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
    } catch (error) {
      console.log(error.message);
    }

    // const a = document.createElement("a");
    // a.href = imageUrl;
    // a.download = fileName;

    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  };
  const {
    isLoading,
    data,
    error,
    refetch: urlDetails,
  } = useGetUrlDetails({
    id,
    user_id: user?.id,
  });

  const {
    isLoading: statsLoading,
    data: stats,
    refetch: clickStats,
  } = useGetClickStats({
    url_id: id,
  });

  const { mutate, isPending } = useDeleteUrls();
  const handleDelete = async () => {
    // console.log(isPending);
    await mutate(data?.id);
    redirect("/dashboard");
  };

  let link = "hi";
  console.log(data);

  if (data) {
    console.log(data);

    link = data?.custom_url ? data?.custom_url : data?.short_url;
    console.log(link);
  }

  useEffect(() => {
    urlDetails();
    clickStats();
  }, [clickStats, urlDetails]);

  if (error) {
    navigate("/dashboard");
  }
  return (
    <>
      {(isLoading || statsLoading) && (
        <BarLoader className="mb-4" width={"100%"} color="36d7b7" />
      )}

      <div className="flex flex-col justify-start gap-8 sm:flex-row">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="cursor-pointer text-6xl font-extrabold hover:underline">
            {data?.title}
          </span>
          <a
            className="cursor-pointer text-3xl font-bold text-blue-400 hover:underline sm:text-4xl"
            href={`https://shrinklr.in/${link}`}
            target="_blank"
          >
            https://shrinklr.in/{link}
          </a>

          <a
            href={data?.original_url}
            className="flex cursor-pointer items-center gap-1 hover:underline"
          >
            <LinkIcon />
            {data?.original_url}
          </a>
          <span className="flex items-end text-sm font-extralight">
            {new Date(data?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button variant="ghost">
              {/* <Copy
                onClick={() =>
                  window.navigator.clipboard.writeText(
                    `https://shrinklr.in/${data?.short_url}`,
                  )
                }
              /> */}

              {copied ? (
                <ClipboardCheck />
              ) : (
                <Copy
                  onClick={() => {
                    //todo: change the localhost to something of a domain
                    navigator.clipboard
                      .writeText(`shrinklr.vercel.app/${data?.short_url}`)
                      .then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
                      });
                  }}
                />
              )}
            </Button>
            <Button variant="ghost">
              {/* <Download /> */}
              {download ? <Loader /> : <Download onClick={handleDownload} />}
            </Button>
            <Button variant="ghost" onClick={handleDelete} disabled={isPending}>
              {isPending ? <BeatLoader size={5} color="white" /> : <Trash />}
            </Button>
          </div>
          <img
            src={data?.qr_code}
            className="w-full self-center object-contain p-1 ring ring-blue-500 sm:self-start"
            alt="qr code"
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="w-full text-4xl font-extrabold">
              Stats
            </CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <CardTitle>Device Data</CardTitle>
            </CardContent>
          ) : (
            <CardContent>
              {statsLoading === false ? "No stats yet" : "Loading stats"}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default LinkPage;
