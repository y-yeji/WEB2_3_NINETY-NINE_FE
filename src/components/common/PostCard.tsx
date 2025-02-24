import Icon from "../../assets/icons/Icon";
import { useNavigate } from "react-router-dom";

const Temp_PostCard = [
  {
    post: {
      id: 1,
      title: "우연히 웨스 앤더슨 2 같이 가실분!",
      content: "우연히 웨스 앤더슨 2 같이 가실분!...",
      imageUrl: "/default-image.png",
      createdAt: "2025-02-24",
      viewCount: 100,
      commentCount: 5,
      likeCount: 10,
    },
    user: {
      id: 1,
      username: "NINETY9",
      profileImage: "/default-image.png",
    },
    isLiked: false,
    onLikeChange: (postId: number, liked: boolean) => {
      console.log(`Post ${postId} liked status changed to ${liked}`);
    },
  },
];

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    viewCount: number;
    commentCount: number;
    likeCount: number;
  };
  user: {
    id: number;
    username: string;
    profileImage: string;
  };
  isLiked: boolean;
  onLikeChange: (postId: number, liked: boolean) => void;
}

export default function PostCard({
  post = Temp_PostCard[0].post,
  user = Temp_PostCard[0].user,
  isLiked = Temp_PostCard[0].isLiked,
  onLikeChange = Temp_PostCard[0].onLikeChange,
}: PostCardProps) {
  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onLikeChange(post.id, !isLiked);
  };

  const navigate = useNavigate();
  const handlePostCardClick = () => {
    navigate("/community/detail");
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
              src={post.imageUrl}
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
                  src={user.profileImage}
                  className="w-full h-full object-cover bg-center"
                  alt="유저 프로필 기본 이미지"
                />
              </div>
              <span className="caption-r">{user.username}</span>
            </div>
            <div className="flex items-center gap-[1.5px]">
              <Icon name="CalendarRange" size={14} strokeWidth={1.5} />
              <span className="caption-r">{post.createdAt}</span>
            </div>
          </div>
          <p className="caption-r line-clamp-1">{post.title}</p>
        </div>
      </div>
    </>
  );
}
