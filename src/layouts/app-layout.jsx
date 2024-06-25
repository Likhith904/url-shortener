import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <main className="container min-h-screen">
        <Header />
        {/* content */}
        <Outlet />
      </main>
      <div className="mt-10 flex w-full flex-col bg-gray-800 p-10 text-center">
        <p>Made with 💖 by Likhith.</p>
        <p>Copyright © 2024 Likhith shrinklr.ai</p>
      </div>
    </>
  );
};

export default AppLayout;
