import { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useGetClicks } from "@/hooks/useGetClicks";
import { useGetUrls } from "@/hooks/useGetUrls";
import Error from "@/components/error.jsx";
import { UserState } from "@/context/userContext";
import LinkCard from "@/components/LinkCard";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const { user, fetchUser } = UserState();
  const {
    data: urls,
    error,
    isLoading,
    refetch: getUrls,
  } = useGetUrls(user?.id);
  const urlIds = Array.isArray(urls) ? urls.map((url) => url.id) : [];
  const {
    data: clicks,
    error: clicksError,
    isLoading: loadingClicks,
    refetch: getClicks,
  } = useGetClicks(urlIds);

  useEffect(() => {
    getUrls();
    fetchUser();
    console.log(user?.id);
  }, []);
  useEffect(() => {
    if (urls?.length > 0) getClicks();
  }, [urls?.length, search]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="flex flex-col gap-8">
      {(isLoading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <Button>Create Link</Button>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter links..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Filter className="absolute right-2 top-2 p-1" />
      </div>
      {(error || clicksError) && (
        <Error message={error.message || clicksError.message} />
      )}
      {(filteredUrls || []).map((url, ind) => {
        return <LinkCard key={ind} url={url} fetchUrls={getUrls} />;
      })}
    </div>
  );
};

export default Dashboard;
