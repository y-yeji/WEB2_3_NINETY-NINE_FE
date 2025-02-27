import { useState } from "react";
import Icon from "../../assets/icons/Icon";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

// api 수정될 때 까지 쓸 임시 데이터
const Temp_PostCard = {
  imageUrl: [
    "/default-image.png",
    "/default-image.png",
    "/default-image.png",
    "/default-image.png",
  ],
  userNickname: "NINETY9",
  userProfileImage: "/default-image.png",
  title: "임시 제목",
  content: "임시 내용",
  commentCount: 0,
  likeCount: 0,
  createdAt: "2025-02-27",
  isLiked: false,
};
interface PostCardProps {
  post?: {
    id: number;
    userId: number;
    title: string;
    content: string;
    imageUrl: string; //api 수정전까지 사용, 수정후 string[] 로 수정
    viewCount: number;
    commentCount: number;
    likeCount: number;
    userNickname: string;
    userProfileImage: string;
    createdAt: string;
    updatedAt: string;
    isLiked: boolean;
    likeId?: number;
  };
}

export default function PostCard({ post = {} }: PostCardProps) {
  const mergedPost = { ...Temp_PostCard, ...post };
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [likeId, setLikedId] = useState(post.likeId);

  const navigate = useNavigate();
  const handlePostCardClick = () => {
    navigate("/community/detail");
  };

  // 좋아요 생성 및 삭제 함수
  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (isLiked) {
        await api.delete(`/api/socialPosts/${post.id}/likes/${likeId}`);
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
        setLikedId(undefined);
      } else {
        const response = await api.post(`api/socialPosts/${post.id}/likes`);
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
        setLikedId(response.data.id);
      }
    } catch (error) {
      console.error("좋아요 오류 발생", error);
    }
  };

  return (
    <>
      <div
        className="w-[300px] h-[362px] pt-[17px] px-[13.5px] rounded-[10px] bg-white border border-gray-20 hover:shadow-user-postcard-shadow transition-shadow duration-300 cursor-pointer"
        onClick={handlePostCardClick}
      >
        <div className="w-[265px] h-[265px] relative overflow-hidden">
          <div className="w-full h-full">
            <img
              src={mergedPost.imageUrl}
              className="w-full h-full object-cover bg-center"
              alt="게시글 카드 이미지"
            />
          </div>
          <div className="w-auto h-[22px] absolute right-[10px] bottom-[10px] flex gap-[3px] rounded-full py-[3px] px-[10.5px] bg-blue-6">
            <div className="flex gap-[2px] items-center">
              <button onClick={handleToggleLike}>
                <Icon
                  name="Heart"
                  size={18}
                  strokeWidth={1.5}
                  className={isLiked ? "fill-white text-white" : "text-white"}
                />
              </button>
              <span className="caption-r text-white">
                {mergedPost.likeCount}
              </span>
            </div>
            <div className="flex gap-[2px] items-center">
              <Icon
                name="MessageCircle"
                size={18}
                strokeWidth={1.5}
                className="text-white"
                style={{ transform: "scaleX(-1)" }}
              />
              <span className="caption-r text-white">
                {mergedPost.commentCount}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-[19px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 mb-2.5">
              <div className="w-6 h-6 rounded-full overflow-hidden userProfile-shadow">
                <img
                  src={mergedPost.userProfileImage}
                  className="w-full h-full object-cover bg-center"
                  alt="유저 프로필 기본 이미지"
                />
              </div>
              <span className="caption-r">{mergedPost.userNickname}</span>
            </div>
            <div className="flex items-center gap-[1.5px]">
              <Icon name="CalendarRange" size={14} strokeWidth={1.5} />
              <span className="caption-r">{mergedPost.createdAt}</span>
            </div>
          </div>
          <p className="caption-r line-clamp-1">{mergedPost.title}</p>
        </div>
      </div>
    </>
  );
}
