import { useEffect, useRef, useState } from "react";
import Icon from "../../assets/icons/Icon";
import ShortButton from "../../components/ui/ShortButton";
import PostImageTabs from "./PostImageTabs";
import { useNavigate } from "react-router-dom";

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
      username: "NINETY9",
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

const CommunityDetail = () => {
  const post = Temp_PostCard[0].post;
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState<
    Array<{ id: number; content: string; username: string; createdAt: string }>
  >([]);

  const menuRef = useRef<HTMLButtonElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHEight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const minHeight = 40;
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`;
    }
  };
  const onCommentInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const inputValue = (event.target as HTMLTextAreaElement).value;
    if (inputValue.match(/^\s+/)) {
      textarea.value = "";
      return;
    }
    setCommentValue(inputValue);
    adjustTextareaHEight();
  };

  const onCommentBlur = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const trimmed = textarea.value.trim();
    setCommentValue(trimmed);
    adjustTextareaHEight();
  };

  const handleCommentSubmit = () => {
    if (commentValue.trim()) {
      const newComment = {
        id: Date.now(),
        content: commentValue.trim(),
        username: "NINETY9",
        createdAt: new Date().toISOString(),
      };
      setComments((prevComments) => [newComment, ...prevComments]);
      setCommentValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const togglePostMenu = () => {
    setIsPostMenuOpen(!isPostMenuOpen);
  };
  const toggleCommentMenu = () => {
    setIsCommentMenuOpen(!isCommentMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsPostMenuOpen(false);
        setIsCommentMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsPostMenuOpen(false);
    navigate(`/community/editor/${post.id}`);
  };

  useEffect(() => {
    if (Temp_PostCard[0].comment) {
      setComments([
        {
          id: Temp_PostCard[0].comment.id,
          content: Temp_PostCard[0].comment.content,
          username: Temp_PostCard[0].user.username,
          createdAt: Temp_PostCard[0].comment.createdAt,
        },
      ]);
    }
  }, []);

  return (
    <article className="w-[1120px] mx-auto mt-[156px]">
      <section className="mb-[52px] border-b border-gray-30">
        <h2 className="h1-b mb-[15px]">
          인상파, 모네에서 미국으로: 빛, 바다를 건너다 전시 관심있으신 분
          같이가요!!!
        </h2>
        <div className="relative mb-[22px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <img
                  className="w-[30px] h-[30px] rounded-full"
                  src="/default-image.png"
                  alt="유저프로필 이미지"
                />
                <span className="caption-m">NINETY9</span>
              </div>
              <span className="flex items-center gap-1 text-gray-60">
                <Icon name="CalendarRange" size={16} />
                <span className="caption-r">{post.createdAt}</span>
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
                <button>포스트 삭제</button>
              </li>
            </ul>
          )}
        </div>
      </section>

      <section>
        <PostImageTabs images={post.imageUrl} />
        <div className="mb-5 border-b border-gray-30">
          <div className="mb-6"></div>
          <p className="mb-10">{post.content}</p>
        </div>
        <div className="mb-[34px]">
          <div className="flex gap-[10px]">
            <div className="flex items-center gap-[6px]">
              <button>
                <Icon name="Heart" size={30} strokeWidth={2} />
              </button>
              <span className="text-[20px]/6 font-bold text-blue-1">0</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <Icon
                name="MessageCircle"
                size={30}
                strokeWidth={2}
                style={{ transform: "scaleX(-1)" }}
              />
              <span className="text-[20px]/6 font-bold text-blue-1">10</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div>
          <div className="flex items-center gap-6 mb-[60px]">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden userProfile-shadow ">
              <img
                className="w-full h-full object-cover bg-center"
                src="/default-image.png"
                alt="유저 프로필 이미지"
              />
            </div>
            <div className="flex gap-[14px]">
              <textarea
                ref={textareaRef}
                value={commentValue}
                onInput={onCommentInput}
                onBlur={onCommentBlur}
                className="w-[907px] min-h-[40px] border-b border-gray-30 p-2 placeholder:pl-[6px] body-small-r break-words resize-none focus:border-blue-1"
                placeholder="댓글을 입력하세요."
              />
              <ShortButton
                text="댓글 등록"
                textColor="base-1"
                bgColor="blue-1"
                onClick={handleCommentSubmit}
              />
            </div>
          </div>
        </div>
        {comments.map((comment) => (
          <div key={comment.id} className="relative">
            <div className="pl-1 border-b border-gray-30">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[6px] mr-[10px] mb-[9px] ">
                  <div className="w-[25px] h-[25px] rounded-full overflow-hidden userProfile-shadow">
                    <img
                      className="w-full h-full object-cover bg-center"
                      src="/default-image.png"
                      alt="유저프로필이미지"
                    />
                  </div>
                  <span className="body-normal-m">{comment.username}</span>
                  <span className="caption-r text-gray-30">
                    {comment.createdAt}
                  </span>
                </div>
                <button onClick={() => toggleCommentMenu()}>
                  <Icon
                    name="EllipsisVertical"
                    size={24}
                    className="text-blue-1"
                  />
                </button>
              </div>
              <p className="mb-[15px]">{comment.content}</p>
            </div>
            {isCommentMenuOpen && (
              <ul className="w-[114px] h-16 absolute top-[29px] right-2 py-[7px] px-7 bg-white rounded border border-blue-7 body-small-r text-center">
                <li className="mb-2 hover:text-blue-4">
                  <button>댓글 수정</button>
                </li>
                <li className=" hover:text-blue-4">
                  <button>댓글 삭제</button>
                </li>
              </ul>
            )}
          </div>
        ))}
      </section>
    </article>
  );
};

export default CommunityDetail;
