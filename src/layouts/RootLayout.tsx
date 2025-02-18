import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="w-full max-w-[1280px] mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
