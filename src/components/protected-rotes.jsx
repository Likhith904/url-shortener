import { UserState } from "@/context/userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = UserState();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/auth");
  }, [isAuthenticated, isLoading]);

  if (isLoading)
    return (
      <HashLoader
        className="flex w-full flex-col items-center"
        width={"100%"}
        color="#36d7b7"
      />
    );

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
