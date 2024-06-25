import { createContext } from "react";
import { useGetCurrentUser } from "@/hooks";
import { useContext } from "react";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const { data: user, isLoading, refetch: fetchUser } = useGetCurrentUser();

  const isAuthenticated = user?.role === "authenticated";

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, isLoading, fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserContextProvider;
