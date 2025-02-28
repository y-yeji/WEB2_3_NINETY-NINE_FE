import { Link, NavLink } from "react-router-dom";
import Icon from "../assets/icons/Icon";
import React from "react";
import GitHubLogo from "../assets/github-logo.svg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ isOpen, onClose }, ref) => {
    return (
      <aside
        ref={ref}
        className={`sidebar ${isOpen ? "open" : ""} pt-[30px] px-[45px] bg-blue-7 z-10`}
      >
        <button onClick={onClose} className="absolute top-[8px] left-[16px]">
          <Icon name="X" size={22} className="blue-1" />
        </button>
        <section>
          {/* 비회원시 */}
          <div className="">
            <div className="mb-[17px]">
              <h4 className="h4-b mb-[28px]">안녕하세요.</h4>
              <span className="caption-r">
                온컬쳐와 함께 문화생활을 즐겨보시겠어요?
              </span>
            </div>
            <div className="flex justify-end mb-[17px]">
              <button className="w-[72px] h-[30px] py-[4.5px] rounded border border-base-1 bg-blue-7 text-blue-1 hover:bg-blue-4 hover:text-base-1 hover:border-transparent body-small-r">
                로그인
              </button>
            </div>
          </div>
          {/* 로그인회원시 */}
          <div className="mb-[17px] hidden">
            <div className="flex items-center justify-between mb-[3px]">
              <div className="flex items-center gap-2">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden userProfile-shadow">
                  <img
                    src="defaultImage"
                    className="w-full h-full object-cover bg-center"
                    alt="유저 프로필 기본 이미지"
                  />
                </div>
                <span>
                  <span className="mr-[5px]">NINETY9</span>
                  <span>님</span>
                </span>
              </div>
              <Link to="">
                <button>
                  <Icon name="Settings" size={18} className="text-blue-5" />
                </button>
              </Link>
            </div>
            <div className="flex justify-end">
              <button className="w-[72px] h-[30px] py-[4.5px] rounded bg-blue-4 text-base-1 border border-transparent  hover:bg-blue-7 hover:text-blue-1 hover:border-base-1  body-small-r">
                로그아웃
              </button>
            </div>
            <ul className="body-small-r">
              <li>
                <button className="hover:text-blue-4 mb-[7px]">
                  새글 작성
                </button>
              </li>
              <li>
                <button className="hover:text-blue-4">마이페이지</button>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-[18px] border-t border-b border-base-1 ">
          <div className="mt-[20px] text-base-1">
            {[
              { to: "/informations/popups", text: "팝업스토어" },
              { to: "/informations/exhibition", text: "전시회" },
              { to: "/informations/musical", text: "뮤지컬 | 연극" },
              {
                to: "/informations/concert",
                text: "페스티벌 | 콘서트",
              },
              { to: "/map-search", text: "지도 검색" },
              { to: "/social-community", text: "소셜 커뮤니티" },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) => {
                  console.log(`${item.text} is active:`, isActive);
                  return `block w-[230px] h-[46px] mb-[15px] rounded ${
                    isActive
                      ? "bg-base-1 text-blue-7"
                      : "text-base-1 hover:bg-base-1 hover:text-blue-7"
                  }`;
                }}
              >
                <div className="flex items-center h-full px-4 body-large-m">
                  {item.text}
                </div>
              </NavLink>
            ))}
          </div>
        </section>

        <section className="body-small-r text-blue-1">
          <div className="flex flex-col items-start mt-[18px] mb-[30px] px-4">
            <div className="flex items-center gap-2 mb-2">
              <a
                href="https://github.com/prgrms-web-devcourse-final-project/WEB2_3_NINETY-NINE_FE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mb-2"
              >
                <img
                  className="w-[25px] h-[25px]"
                  src={GitHubLogo}
                  alt="깃허브로고"
                />
                <span>On culture_FE</span>
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  왕정훈
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  이예지
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  정다윤
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start mb-6 border-b pb-4 px-4">
            <div className="flex items-center gap-2 mb-2">
              <a
                href="https://github.com/prgrms-web-devcourse-final-project/WEB2_3_NINETY-NINE_BE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mb-2"
              >
                <img
                  className="w-[25px] h-[25px]"
                  src={GitHubLogo}
                  alt="깃허브로고"
                />
                <span>On culture_BE</span>
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-[17.5px] gap-y-2">
              <li>
                <a href="" target="_blank" rel="noopener noreferrer">
                  김태영
                </a>
              </li>
              <li>
                <a href="" target="_blank" rel="noopener noreferrer">
                  범태현
                </a>
              </li>
              <li>
                <a href="" target="_blank" rel="noopener noreferrer">
                  신정범
                </a>
              </li>
              <li>
                <a href="" target="_blank" rel="noopener noreferrer">
                  유현수
                </a>
              </li>
            </ul>
          </div>
          <p className=" text-center">Team. NINETY-NINE</p>
        </section>
      </aside>
    );
  }
);

export default Sidebar;
