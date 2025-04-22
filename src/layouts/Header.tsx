import React, { useState, useRef } from "react";
import Icon from "../assets/icons/Icon";
import Sidebar from "./Sidebar/Sidebar";
import NotificationManager from "../components/notification/NotificationManager";
import { useAuthStore } from "../stores/authStore";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      if (!prev) setIsNotificationOpen(false);
      return !prev;
    });
  };

  const toggleNotification = () => {
    setIsNotificationOpen((prev) => {
      if (!prev) setIsSidebarOpen(false);
      return !prev;
    });
  };

  return (
    <>
      <header className="w-full xl:h-[84px] max-xm:h-16 xm:h-16 top-0 left-0 fixed px-10 xl:py-[21px] max-xm:py-[18px] xm:py-[18px] z-20 bg-blue-7">
        <div className="max-w-[1280px] mx-auto flex justify-between self-center items-center h-full">
          <a href="/" aria-label="홈페이지로 이동">
            <h1 className="font-dm italic text-blue-1 text-2xl/[38px]">
              On culture
            </h1>
          </a>
          <div className="flex gap-4">
            {/* 알림 버튼 */}
            {isLoggedIn && (
              <NotificationManager
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                onToggle={toggleNotification}
              />
            )}

            {/* 사이드바 버튼 */}
            <button onClick={toggleSidebar} aria-label="메뉴 열기">
              {isSidebarOpen ? (
                <Icon name="X" size={24} className="text-blue-1" />
              ) : (
                <Icon name="Menu" size={24} className="text-blue-1" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 사이드바 */}
      {isSidebarOpen && (
        <Sidebar
          ref={sidebarRef}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
