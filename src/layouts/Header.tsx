import { useEffect, useRef, useState } from "react";
import Icon from "../assets/icons/Icon";
import Sidebar from "./Sidebar/Sidebar";
import Notification from "../components/notification/notification";

const Header: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  // 알림창 열고 닫기
  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
    if (!showNotification) {
      setIsSidebarOpen(false); // 알림창이 열리면 사이드바 닫기
    }
  };

  // 사이드바 열고 닫기
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setShowNotification(false); // 사이드바가 열리면 알림창 닫기
    }
  };

  // 외부 클릭 감지로 알림창 및 사이드바 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        showNotification
      ) {
        setShowNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, showNotification]);

  return (
    <>
      <header className="w-full h-[84px] top-0 left-0 fixed px-10 py-[21px] z-20 bg-blue-7">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <a href="/" aria-label="홈페이지로 이동">
            <h1 className="font-dm italic text-blue-1 text-2xl/[38px]">
              On culture
            </h1>
          </a>
          <div className="flex gap-4">
            {/* 알림 버튼 */}
            <button onClick={handleNotificationClick} aria-label="알림 열기">
              <Icon name="Bell" size={24} className="text-blue-1" />
            </button>

            {/* 사이드바 버튼 */}
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

      {/* 사이드바 */}
      <Sidebar
        ref={sidebarRef}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />

      {/* 알림창 */}
      <Notification
        ref={notificationRef}
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
};

export default Header;
