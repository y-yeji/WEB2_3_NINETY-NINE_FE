import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostImageTabs from "./PostImageTabs";
import Icon from "../../assets/icons/Icon";
import { formatDate } from "../../utils/dateUtils";
import CommunityDetail from "./CommunityDetail";
import { useAuthStore } from "../../stores/authStore";
import api from "../../api/api";
import { useModalStore } from "../../stores/modalStore";

const Temp_PostCard = [
  {
    post: {
      id: 1,
      title: "우연히 웨스 앤더슨 2 같이 가실분!",
      content:
        "우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!우연히 웨스 앤더슨 2 같이 가실분!!",
      imageUrl: [
        "/default-image.png",
        "/default-image.png",
        "/default-image.png",
        "/default-image.png",
      ],
      createdAt: "2025-02-24",
      viewCount: 100,
      commentCount: 5,
      likeCount: 10,
    },
    user: {
      id: 1,
      userNickname: "NINETY9",
      profileImage: "/default-image.png",
    },
    isLiked: false,
    onLikeChange: (postId: number, liked: boolean) => {
      console.log(`Post ${postId} liked status changed to ${liked}`);
    },
    comment: {
      id: 1,
      socialPostId: 1,
      userId: 1,
      content: "전시회 재밌어보여요~~",
      createdAt: "2025-02-16T02:12:06.367240743",
      updatedAt: "2025-02-16T02:12:06.367267977",
    },
  },
];

// interface PostDetailProps {
//   postDetail: CommunityDetail | null;
//   socialPostId: string;
// }

interface Modal {
  text: string;
}

// const PostDetail: React.FC<PostDetailProps> = ({ postDetail }) => {
const PostDetail: React.FC = () => {
  // if (!postDetail) {
  //   return <div>로딩 중...</div>;
  // }
  const { accessToken } = useAuthStore();
  const [post, setPost] = useState(Temp_PostCard[0].post);
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const { openModal } = useModalStore();
  const menuRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const togglePostMenu = () => {
    setIsPostMenuOpen(!isPostMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsPostMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditClick = () => {
    setIsPostMenuOpen(false);
    navigate(`/community/editor/${post.id}`);
    // navigate(`/community/editor/${postDetail.id}`);
  };

  const handleDeletePost = () => {
    openModal(
      "포스트를 삭제하시면 더 이상 볼 수 없습니다. 정말 삭제 하시겠어요?",
      "취소 하기",
      "삭제 하기",
      async () => {
        try {
          const response = await api.delete(`api/socialPosts/${post.id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (response.status === 200) {
            console.log("포스트 삭제가 완료되었습니다.", response.data);
            navigate("/community");
          }
        } catch (error) {
          console.error("포스트 삭제를 실패했습니다.", error);
        }
      }
    );
  };
  return (
    <>
      <section className="mb-[52px] border-b border-gray-30">
        <h2 className="h1-b mb-[15px]">{post.title}</h2>
        {/* <h2 className="h1-b mb-[15px]">{postDetail?.title}</h2> */}
        <div className="relative mb-[22px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <img
                  className="w-[30px] h-[30px] rounded-full"
                  src="/default-image.png"
                  alt="유저프로필 이미지"
                />
                <span className="caption-m">
                  {Temp_PostCard[0].user.userNickname}
                  {/* {postDetail.userNickname || "NINETY9"} */}
                </span>
              </div>
              <span className="flex items-center gap-1 text-gray-60">
                <Icon name="CalendarRange" size={16} />
                <span className="caption-r">
                  {formatDate(post.createdAt)}
                  {/* {formatDate(postDetail.createdAt)} */}
                </span>
              </span>
            </div>
            <button ref={menuRef} onClick={togglePostMenu}>
              <Icon name="EllipsisVertical" size={24} className="text-blue-1" />
            </button>
          </div>
          {isPostMenuOpen && (
            <ul className="w-[114px] h-16 absolute top-[26px] right-2 py-2 px-6 bg-white rounded border border-blue-7 body-small-r text-center">
              <li className="mb-2 hover:text-blue-4">
                <button onClick={handleEditClick}>포스트 수정</button>
              </li>
              <li className=" hover:text-blue-4">
                <button onClick={handleDeletePost}>포스트 삭제</button>
              </li>
            </ul>
          )}
        </div>
      </section>

      <section>
        <PostImageTabs
          images={post.imageUrl}
          // images={postDetail.imageUrl || "/default-image.png"}
        />
        <div className="mb-5 border-b border-gray-30">
          <div className="mb-6"></div>
          <p className="mb-10">
            {post.content}
            {/* {postDetail.content} */}
          </p>
        </div>
        <div className="mb-[34px]">
          <div className="flex gap-[10px]">
            <div className="flex items-center gap-[6px]">
              <button>
                <Icon name="Heart" size={30} strokeWidth={2} />
              </button>
              <span className="text-[20px]/6 font-bold text-blue-1">
                {post.likeCount}
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
                {post.commentCount}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PostDetail;
