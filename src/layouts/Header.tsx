import { useState } from "react";
import Icon from "../assets/icons/Icon";

const Header = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const handleNotificationClick = () => {
    setShowNotification(true);
  };
  const handleToggleSidebarClick = () => {
    setToggleSidebar(!toggleSidebar);
  };
  return (
    <header className="w-full h-[84px] top-0 left-0 fixed px-10 py-[21px] z-10 bg-blue-7  ">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <a href="/" aria-label="홈페이지로 이동">
          <h1 className="font-dm italic text-blue-1 text-2xl/[38px]">
            On culture
          </h1>
        </a>
        <div className="flex gap-4">
          <button onClick={handleNotificationClick} aria-label="알림 열기">
            <Icon name="Bell" size={24} className="text-blue-1" />
          </button>
          <button onClick={handleToggleSidebarClick} aria-label="메뉴 열기">
            {toggleSidebar === true ? (
              <Icon name="X" size={24} className="text-blue-1" />
            ) : (
              <Icon name="Menu" size={24} className="text-blue-1" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
