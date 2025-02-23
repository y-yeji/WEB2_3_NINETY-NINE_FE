import { useState } from "react";
import Icon from "../../assets/icons/Icon";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  post: {
    postId: number;
    thumbnail: string;
    title: string;
    date: string;
  };
  user: {
    profileImage: string;
    username: string;
  };
  initialLike: number;
  initialComment: number;
  onLikeChange: (postId: number, newLikeCount: number) => void;
}

export default function PostCard({
  post,
  user,
  initialLike,
  initialComment,
  onLikeChange,
}: PostCardProps) {
  const [likeCount, setLikeCount] = useState(initialLike);
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    setIsLiked(!isLiked);
    onLikeChange(post.postId, newLikeCount);
  };
  const navigate = useNavigate();
  const handlePostCardClick = () => {
    navigate("/community/detail");
  };
  return (
    <>
      <div
        className="w-[300px] h-[362px] pt-[17px] px-[13.5px] rounded-[10px] bg-white border border-gray-20 mt-[100px] hover:shadow-user-postcard-shadow transition-shadow duration-300 cursor-pointer"
        onClick={handlePostCardClick}
      >
        <div className="w-[265px] h-[265px] relative overflow-hidden">
          <div className="w-full h-full">
            <img
              src={post.thumbnail}
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
              <span className="caption-r text-white">{likeCount}</span>
            </div>
            <div className=" flex gap-[2px] items-center">
              <Icon
                name="MessageCircle"
                size={18}
                strokeWidth={1.5}
                className="text-white"
                style={{ transform: "scaleX(-1)" }}
              />
              <span className="caption-r text-white">{initialComment}</span>
            </div>
          </div>
        </div>
        <div className="mt-[19px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 mb-2.5">
              <div className="w-6 h-6 rounded-full overflow-hidden userProfile-shadow">
                <img
                  src={user.profileImage}
                  className="w-full h-full object-cover bg-center"
                  alt="유저 프로필 기본 이미지"
                />
              </div>
              <span className="caption-r">{user.username}</span>
            </div>
            <div className="flex items-center gap-[1.5px]">
              <Icon name="CalendarRange" size={14} strokeWidth={1.5} />
              <span className="caption-r">{post.date}</span>
            </div>
          </div>
          <p className="caption-r line-clamp-1">{post.title}</p>
        </div>
      </div>
    </>
  );
}
