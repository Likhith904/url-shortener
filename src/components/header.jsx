import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { LinkIcon } from "lucide-react";
import { UserState } from "@/context/userContext";
import { useSupabaseLogout } from "@/hooks";
import { BeatLoader } from "react-spinners";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboardIcon } from "lucide-react";

const Header = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, fetchUser } = UserState();
  const { mutate, isPending } = useSupabaseLogout();

  const handleLogout = async () => {
    console.log(isPending);
    mutate(null, {
      onSuccess: async () => {
        console.log("Logout successful");
        await queryClient.invalidateQueries("userDetails");
        await fetchUser();
        navigate("/");
      },
      onError: (error) => {
        console.log("Error while logout", error.message);
      },
    });
  };

  return (
    <>
      <nav className="items-centers flex justify-between py-4">
        <Link to="/">
          <img src="/logo1.png" className="h-12" alt="url shortener logo" />
        </Link>
        {/* //TODO: add breadcrumb to show the navigation */}
        <div>
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 overflow-hidden rounded-full">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>LD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                  <Link to="/dashboard">
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  <Link to="/dashboard">
                    <span>My Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {isPending && (
          <BeatLoader
            className="mb-4"
            size={10}
            width={"100%"}
            color="#36d7b7"
          />
        )}
      </nav>
    </>
  );
};

export default Header;
