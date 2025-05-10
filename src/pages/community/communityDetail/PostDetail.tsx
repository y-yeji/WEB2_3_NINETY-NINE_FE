import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostImageTabs from "./PostImageTabs";
import Icon from "../../../assets/icons/Icon";
import { formatDate } from "../../../utils/dateUtils";
import api from "../../../api/api";
import { useModalStore } from "../../../stores/modalStore";
import { useLikeState } from "../../../hooks/useLikeState";
import { useAuthStore } from "../../../stores/authStore";
import { PostCardProps } from "../../../types/post";
import DOMPurify from "dompurify";

interface PostDetailProps {
  postDetail: PostCardProps["post"] | null;
  socialPostId: string;
  onLikeToggle: (newLikeStatus: boolean, newLikeCount: number) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({
  postDetail,
  socialPostId,
  onLikeToggle,
}: PostDetailProps) => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { isLoggedIn, checkAuth, user } = useAuthStore();
  const token = localStorage.getItem("accessToken");

  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { isLiked, likeCount, toggleLike } = useLikeState(
    parseInt(socialPostId),
    postDetail?.likeStatus || false,
    postDetail?.likeCount || 0
  );

  useEffect(() => {
    if (user && postDetail) {
      setIsAuthor(user.id === postDetail.userId);
    }
  }, [user, postDetail]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsPostMenuOpen(false);
      }
    };

    if (screenWidth >= 640) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (screenWidth >= 640) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [screenWidth]);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const togglePostMenu = () => {
    setIsPostMenuOpen((prev) => !prev);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsPostMenuOpen(false);
    navigate(`/community/editor/${socialPostId}`);
  };

  const handleDeletePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openModal(
      `포스트를 삭제하시면 더 이상 볼 수 없습니다.
      정말 삭제 하시겠어요?`,
      "취소 하기",
      "삭제 하기",
      async () => {
        try {
          const response = await api.delete(`api/socialPosts/${socialPostId}`, {
            headers: { Authorization: token },
          });
          if (response.status === 200) {
            navigate("/community");
          }
        } catch (error) {
          console.error("포스트 삭제를 실패했습니다.", error);
        }
      }
    );
  };

  const handleLikeClick = async () => {
    setIsLoading(true);
    await checkAuth();

    if (!isLoggedIn) {
      setIsLoading(false);
      openModal(
        `로그인이 필요한 서비스입니다.
        로그인 하러 가시겠어요?`,
        "취소하기",
        "로그인하기",
        () => navigate("/login")
      );
      return;
    }

    const result = await toggleLike();
    if (result && result.success) {
      onLikeToggle(result.newLikeStatus, result.newLikeCount);
    }
    setIsLoading(false);
  };

  // 사용자 프로필 클릭 처리 함수 추가
  const handleUserProfileClick = () => {
    if (!postDetail || !postDetail.userId) return;

    if (user && user.id === postDetail.userId) {
      navigate("/mypage");
    } else {
      navigate(`/userpage/${postDetail.userId}`);
    }
  };

  return (
    <>
      <section className="mb-[52px] border-b border-gray-30">
        <h2 className="h1-b mb-[15px]">{postDetail?.title}</h2>
        <div className="relative mb-[22px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <img
                  className="w-[30px] h-[30px] rounded-full cursor-pointer userProfile-shadow"
                  src={postDetail?.userProfileImage || "/default-image.png"}
                  alt="유저프로필 이미지"
                  onClick={handleUserProfileClick}
                />
                <span
                  className="caption-m cursor-pointer"
                  onClick={handleUserProfileClick}
                >
                  {postDetail?.userNickname}
                </span>
              </div>
              <span className="flex items-center gap-1 text-gray-60">
                <Icon name="CalendarRange" size={16} />
                <span className="caption-r">
                  {postDetail?.createdAt && formatDate(postDetail?.createdAt)}
                </span>
              </span>
            </div>
            {isAuthor && (
              <div className="relative" ref={menuRef}>
                <button onClick={togglePostMenu}>
                  <Icon
                    name="EllipsisVertical"
                    size={24}
                    className="text-blue-1"
                  />
                </button>
                <div>
                  {isPostMenuOpen && screenWidth < 640 && (
                    <div className="fixed inset-0 bg-blue-7/30 z-5 transition-opacity duration-300" />
                  )}
                  <ul
                    className={`sm:hidden max-xm:w-full xm:w-full max-xm:h-[158px] xm:h-[158px] max-xm:py-5 xm:py-5 max-xm:px-5 xm:px-5 fixed left-0 right-0 bottom-0 bg-white rounded-t-lg border border-blue-7 body-small-r text-center z-30 transition-transform duration-300 ease-in-out
                  ${isPostMenuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <li className="mb-4 hover:text-blue-4">
                      <button onClick={handleEditClick}>포스트 수정</button>
                    </li>
                    <li className="mb-[22px] hover:text-blue-4">
                      <button onClick={handleDeletePost}>포스트 삭제</button>
                    </li>
                    <li className="max-w:[333px] h-10 py-2 border border-blue-7 rounded-lg text-blue-4 ">
                      <button className="w-full" onClick={togglePostMenu}>
                        닫기
                      </button>
                    </li>
                  </ul>
                  <ul
                    className={`hidden sm:block ${isPostMenuOpen ? "sm:block" : "sm:hidden"} w-[114px] h-16 absolute top-[26px] right-2 py-2 px-4 bg-white rounded border border-blue-7 body-small-r text-center z-30`}
                  >
                    <li className="mb-2 hover:text-blue-4">
                      <button onClick={handleEditClick}>포스트 수정</button>
                    </li>
                    <li className="hover:text-blue-4">
                      <button onClick={handleDeletePost}>포스트 삭제</button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <PostImageTabs
          images={postDetail?.imageUrls || ["/default-image.png"]}
        />
        <div className="mb-5 border-b border-gray-30">
          <div className="mb-6"></div>
          <p
            className="mb-10"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(postDetail?.content || ""),
            }}
          />
        </div>
        <div className="mb-[34px]">
          <div className="flex gap-[10px]">
            <div className="flex items-center gap-[6px]">
              <button onClick={handleLikeClick} disabled={isLoading}>
                <Icon
                  name="Heart"
                  size={30}
                  strokeWidth={2}
                  className={
                    isLiked ? "fill-blue-1 text-blue-1" : "text-blue-1"
                  }
                />
              </button>
              <span className="text-[20px]/6 font-bold text-blue-1">
                {likeCount}
              </span>
            </div>
            <div className="flex items-center gap-[6px]">
              <Icon
                name="MessageCircle"
                size={30}
                strokeWidth={2}
                style={{ transform: "scaleX(-1)" }}
              />
              <span className="text-[20px]/6 font-bold text-blue-1">
                {postDetail?.commentCount}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostDetail;
