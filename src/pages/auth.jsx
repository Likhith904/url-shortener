import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/login";
import Signup from "@/components/signup";
import { useNavigate } from "react-router-dom";
import { UserState } from "@/context/userContext";
import { useEffect } from "react";
const Auth = () => {
  const [params] = useSearchParams();
  const longUrl = params.get("createNew");
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, fetchUser } = UserState();
  // if (isAuthenticated && !isLoading) {
  //   fetchUser(); // Ensure user data is fetched
  //   console.log(
  //     "Auth Component: Navigating to dashboard with longUrl:",
  //     longUrl,
  //   );
  //   navigate(`/dashboard?${longUrl ? `createNew=${longUrl}` : ""}`);
  // }

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      fetchUser();
      console.log("inside auth.jsx 17", longUrl);
      navigate(`/dashboard?${longUrl ? `createNew=${longUrl}` : ""}`);
    }
  }, [isLoading, isAuthenticated, longUrl, navigate, fetchUser]);
  return (
    <div className="mt-20 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {longUrl ? "Hold on! Lets login first" : " Login / SignUp"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login longUrl={longUrl} />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
