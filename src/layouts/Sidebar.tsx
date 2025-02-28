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
        className={`sidebar ${isOpen ? "open" : ""} flex pt-[43px] px-10 pb-[15px] bg-blue-7 z-30 rounded border border-base-1`}
      >
        <button onClick={onClose} className="absolute top-[8px] left-[16px]">
          <Icon name="X" size={22} className="blue-1" />
        </button>
        <section className="mr-[50px]">
          <article>
            {/* 비회원시 */}
            <div className="mt-[52px] hidden">
              <div className="mb-[17px]">
                <h4 className="h4-b mb-5">안녕하세요.</h4>
                <span className="caption-r">
                  온컬쳐와 함께 문화생활을 즐겨보시겠어요?
                </span>
              </div>
              <div className="flex justify-end mb-[44px]">
                <Link to="/login">
                  <button className="w-[72px] h-[30px] py-[4.5px] rounded border border-base-1 bg-blue-7 text-blue-1 hover:bg-blue-4 hover:text-base-1 hover:border-transparent body-small-r">
                    로그인
                  </button>
                </Link>
              </div>
            </div>
            {/* 로그인회원시 */}
            <div className="mt-[30px] mb-[25px]">
              <div className="flex items-center justify-between mb-[3px]">
                <div className="flex items-center gap-2">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden userProfile-shadow">
                    <img
                      src="/default-image.png"
                      className="w-full h-full object-cover bg-center"
                      alt="유저 프로필 기본 이미지"
                    />
                  </div>
                  <span>
                    <span className="mr-[5px]">NINETY9</span>
                    <span>님</span>
                  </span>
                </div>
                <Link to="/mypage/edit">
                  <button>
                    <Icon name="Settings" size={18} className="text-blue-5" />
                  </button>
                </Link>
              </div>
              <div className="flex justify-end mb-4">
                <button className="w-[72px] h-[30px] py-[4.5px] rounded bg-blue-4 text-base-1 border border-transparent  hover:bg-blue-7 hover:text-blue-1 hover:border-base-1  body-small-r">
                  로그아웃
                </button>
              </div>
              <ul className="body-small-r">
                <li className="mb-[7px]">
                  <Link to="/community/editor">
                    <button className="hover:text-blue-4 mb-[7px]">
                      새글 작성
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/mypage">
                    <button className="hover:text-blue-4">마이페이지</button>
                  </Link>
                </li>
              </ul>
            </div>
          </article>
          <article className="body-small-r text-blue-1 border-t border-base-1">
            <div className="flex flex-col items-start mt-[32px] mb-[30px] px-4">
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
            <div className="flex flex-col items-start mb-[32px] pl-4 pr-2">
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
            <p className=" border-t border-base-1 pt-[15px] text-center">
              Team. NINETY-NINE
            </p>
          </article>
        </section>

        <section className="h-[430px] flex-grow mb-[18px] border-t border-b border-base-1">
          <div className="pt-5 text-base-1">
            {[
              { to: "/informations/popups", text: "팝업스토어" },
              { to: "/informations/exhibition", text: "전시회" },
              { to: "/informations/musical", text: "뮤지컬 | 연극" },
              {
                to: "/informations/concert",
                text: "페스티벌 | 콘서트",
              },
              { to: "/MapSearch", text: "지도 검색" },
              { to: "/community", text: "소셜 커뮤니티" },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) => {
                  return `block w-[230px] h-[46px] mb-5 rounded ${
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
      </aside>
    );
  }
);

export default Sidebar;
