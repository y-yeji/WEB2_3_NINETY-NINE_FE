import React from "react";
import Icon from "../../assets/icons/Icon";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";
import useLikeStore from "../../stores/likeStore";
import { PostCardProps } from "../../types/Post";

export default function PostCard({ post, onLikeUpdate }: PostCardProps) {
  const navigate = useNavigate();
  const { toggleLike, getLikeStatus } = useLikeStore();
  // const { toggleLike, getLikeStatus, updateLikeCount } = useLikeStore();
  const { isLiked } = getLikeStatus(post.id);
  const likeCount = useLikeStore(
    (state) => state.likeCounts[post.id] ?? post.likeCount
  );

  const handlePostCardClick = () => {
    navigate("/community/detail");
  };

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    await toggleLike(post.id);
  };

  // React.useEffect(() => {
  //   updateLikeCount(post.id, post.likeCount);
  // }, [post.id, post.likeCount, updateLikeCount]);

  return (
    <>
      <div
        className="w-[300px] h-[362px] pt-[17px] px-[13.5px] rounded-[10px] bg-white border border-gray-20 hover:shadow-user-postcard-shadow transition-shadow duration-300 cursor-pointer"
        onClick={handlePostCardClick}
      >
        <div className="w-[265px] h-[265px] relative overflow-hidden">
          <div className="w-full h-full">
            <img
              src={post.imageUrl || "/default-image.png"}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/default-image.png";
              }}
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
              <span className="caption-r text-white">{post.likeCount}</span>
            </div>
            <div className="flex gap-[2px] items-center">
              <Icon
                name="MessageCircle"
                size={18}
                strokeWidth={1.5}
                className="text-white"
                style={{ transform: "scaleX(-1)" }}
              />
              <span className="caption-r text-white">{post.commentCount}</span>
            </div>
          </div>
        </div>
        <div className="mt-[19px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 mb-2.5">
              <div className="w-6 h-6 rounded-full overflow-hidden userProfile-shadow">
                <img
                  src={post.userProfileImage || "/default-image.png"}
                  className="w-full h-full object-cover bg-center"
                  alt="유저 프로필 기본 이미지"
                />
              </div>
              <span className="caption-r">
                {post.userNickname || "NINETY9"}
              </span>
            </div>
            <div className="flex items-center gap-[1.5px]">
              <Icon name="CalendarRange" size={14} strokeWidth={1.5} />
              <span className="caption-r">{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <p className="caption-r line-clamp-1">{post.title}</p>
        </div>
      </div>
    </>
  );
}
