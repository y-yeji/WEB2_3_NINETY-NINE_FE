import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import React from "react";
import TeamIntroduce from "./TeamIntroduce";
import Category from "./Category";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ isOpen, onClose }, ref) => {
    const handleLinkClick = () => {
      setTimeout(onClose, 0);
    };

    return (
      <aside
        ref={ref}
        className={`sidebar ${isOpen ? "open" : ""} flex pt-[43px] px-10 pb-[15px] bg-blue-7 z-30 rounded border border-base-1`}
      >
        <button onClick={onClose} className="absolute top-[14px] left-[16px]">
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
                <Link to="/login" onClick={handleLinkClick}>
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
                <Link to="/mypage/edit" onClick={handleLinkClick}>
                  <button>
                    <Icon name="Settings" size={18} className="text-blue-5" />
                  </button>
                </Link>
              </div>
              <div className="flex justify-end mb-4">
                <button
                  onClick={onClose}
                  className="w-[72px] h-[30px] py-[4.5px] rounded bg-blue-4 text-base-1 border border-transparent  hover:bg-blue-7 hover:text-blue-1 hover:border-base-1  body-small-r"
                >
                  로그아웃
                </button>
              </div>
              <ul className="body-small-r">
                <li className="mb-[7px]">
                  <Link to="/community/editor" onClick={handleLinkClick}>
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
          <TeamIntroduce />
        </section>

        <section className="h-[430px] flex-grow mb-[18px] border-t border-b border-base-1">
          <Category onClick={handleLinkClick} />
        </section>
      </aside>
    );
  }
);

export default Sidebar;
