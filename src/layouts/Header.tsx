import { useEffect, useRef, useState } from "react";
import Icon from "../assets/icons/Icon";
import Sidebar from "./Sidebar/Sidebar";
import Notification from "../components/notification/notification";

const Header: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <header className="w-full h-[84px] top-0 left-0 fixed px-10 py-[21px] z-20 bg-blue-7  ">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <a href="/" aria-label="홈페이지로 이동">
            <h1 className="font-dm italic text-blue-1 text-2xl/[38px]">
              On culture
            </h1>
          </a>
          <div className="flex gap-4">
            <button onClick={handleNotificationClick} aria-label="알림 열기">
              <Icon name="Bell" size={24} className="text-blue-1" />
            </button>
            <button onClick={toggleSidebar} aria-label="메뉴 열기">
              {isSidebarOpen === true ? (
                <Icon name="X" size={24} className="text-blue-1" />
              ) : (
                <Icon name="Menu" size={24} className="text-blue-1" />
              )}
            </button>
          </div>
        </div>
      </header>
      <Sidebar
        ref={sidebarRef}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      <Notification
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
};

export default Header;
