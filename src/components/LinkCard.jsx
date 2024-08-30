/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { Copy, Download, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useDeleteUrls } from "@/hooks/useDeleteUrl";
import { BeatLoader } from "react-spinners";
import { saveAs } from "file-saver";
import { useState } from "react";
import { ClipboardCheck } from "lucide-react";
// import { useQueryClient } from "@tanstack/react-query";
// eslint-disable-next-line react-hooks/rules-of-hooks

const LinkCard = ({ url, fetchUrls }) => {
  const [copied, setCopied] = useState(false);
  const handleDownload = async () => {
    const imageUrl = url?.qr_code;
    const fileName = url?.title;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // const a = document.createElement("a");
      // a.href = blob;
      // a.download = fileName + ".jpg";

      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      saveAs(blob, fileName);
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
  const { mutate, isPending } = useDeleteUrls();
  const handleDelete = async () => {
    console.log(isPending);
    await mutate(url?.id);
    fetchUrls();
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl border bg-gray-900 p-4 md:flex-row">
      <img
        src={url?.qr_code}
        className="h-32 self-start object-contain ring ring-blue-500"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-1 flex-col">
        <span className="flex cursor-pointer text-3xl font-extrabold hover:underline">
          {url?.title}
        </span>
        <span className="flex cursor-pointer text-2xl font-bold text-blue-400 hover:underline">
          https://shrinklr.in/
          {url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className="flex cursor-pointer items-center gap-1 hover:underline">
          {url?.original_url}
        </span>
        <span className="flex flex-1 items-end text-sm font-extralight">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div>
        <Button variant="ghost">
          {/* <Copy
            onClick={() =>
              window.navigator.clipboard.writeText(
                // `https://shrinklr.in/${url?.short_url}`,
                `shrinklr.vercel.app/${url?.short_url}`,
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
                  .writeText(`shrinklr.vercel.app/${url?.short_url}`)
                  .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
                  });
              }}
            />
          )}
        </Button>
        <Button variant="ghost" onClick={handleDownload}>
          <Download />
        </Button>
        <Button variant="ghost" onClick={handleDelete} disabled={isPending}>
          {isPending ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
