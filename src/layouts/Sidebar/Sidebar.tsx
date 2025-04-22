import { Link, useNavigate } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import React, { useEffect } from "react";
import TeamIntroduce from "./TeamIntroduce";
import Category from "./Category";
import { useAuthStore } from "../../stores/authStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ isOpen, onClose }, ref) => {
    const { logout, checkAuth, isLoggedIn, user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      checkAuth();
    }, [checkAuth, navigate]);

    const handleLogout = async () => {
      await logout();
      navigate("/");
    };

    return (
      <aside
        ref={ref}
        className={`sidebar ${isOpen ? "open" : ""} flex max-xm:flex-col xm:flex-col pt-[43px] xl:px-10 max-xm:px-[30px] xm:px-[72px] md:px-[60px] pb-[15px] bg-blue-7 z-30 rounded border border-base-1`}
      >
        <button onClick={onClose} className="absolute top-[14px] left-[16px]">
          <Icon name="X" size={22} className="blue-1" />
        </button>
        <section className="flex xl:gap-[50px] max-xm:flex-col xm:flex-col xl:flex-row">
          <article className="xl:w-[210px]">
            {!isLoggedIn ? (
              <div className="max-xm:mt-5 xm:mt-5 xl:mt-[52px]">
                <div className="mb-[17px]">
                  <h4 className="h4-b mb-5">안녕하세요.</h4>
                  <span className="caption-r">
                    온컬쳐와 함께 문화생활을 즐겨보시겠어요?
                  </span>
                </div>
                <div className="flex justify-end xl:mb-[44px] max-xm:mb-5 xm:mb-5">
                  <Link to="/login" onClick={onClose}>
                    <button className="w-[72px] h-[30px] py-[4.5px] rounded border border-base-1 bg-blue-7 text-blue-1 hover:bg-blue-4 hover:text-base-1 hover:border-transparent body-small-r">
                      로그인
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="xl:mt-[30px] xl:mb-[25px]  max-xm:mb-5 xm:mb-5">
                <div className="flex items-center justify-between mb-[3px]">
                  <div className="flex items-center gap-2">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden userProfile-shadow">
                      <img
                        src={user?.s3Bucket || "/default-image.png"}
                        className="w-full h-full object-cover bg-center"
                        alt="유저 프로필 이미지"
                      />
                    </div>
                    <span>
                      <span className="mr-[5px]">
                        {user?.nickname || "사용자"}
                      </span>
                      <span>님</span>
                    </span>
                  </div>
                  <Link to="/mypage/edit" onClick={onClose}>
                    <button>
                      <Icon name="Settings" size={18} className="text-blue-5" />
                    </button>
                  </Link>
                </div>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleLogout}
                    className="w-[72px] h-[30px] py-[4.5px] rounded bg-blue-4 text-base-1 border border-transparent hover:bg-blue-7 hover:text-blue-1 hover:border-base-1 body-small-r"
                  >
                    로그아웃
                  </button>
                </div>
                <ul className="body-small-r">
                  <li className="mb-[7px]">
                    <Link to="/community/editor" onClick={onClose}>
                      <button className="hover:text-blue-4">새글 작성</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/mypage" onClick={onClose}>
                      <button className="hover:text-blue-4">마이페이지</button>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </article>
          <article className="xm:h-[366px] xl:h-[430px] flex-grow mb-[18px] border-t border-b border-base-1">
            <Category onClick={onClose} />
          </article>
        </section>
        <section className="absolute xl:top-[265px] xl:left-10 max-xm:top-[564px] xm:top-[564px] xm:left-[72px] md:left-[60px] lg:block">
          <TeamIntroduce />
        </section>
      </aside>
    );
  }
);

export default Sidebar;
