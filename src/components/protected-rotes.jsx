import { UserState } from "@/context/userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = UserState();
  const [params] = useSearchParams();
  const longUrl = params.get("createNew");

  useEffect(() => {
    if (!isAuthenticated && !isLoading)
      navigate(`/auth?${longUrl ? `createNew=${longUrl}` : ""}`);
  }, [isAuthenticated, isLoading]);

  if (isLoading)
    return (
      <HashLoader
        className="flex w-full flex-col items-center"
        width={"100%"}
        color="#36d7b7"
      />
    );

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
