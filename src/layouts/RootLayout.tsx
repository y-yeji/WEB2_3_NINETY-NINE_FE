import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="w-full max-w-[1280px] mx-auto">
        <div className="max-xm: mx-4 xm:mx-5 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default RootLayout;
