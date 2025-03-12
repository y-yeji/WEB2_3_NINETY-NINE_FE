import { useRef, useState } from "react";
import ShortButton from "../../../../components/ui/ShortButton";
import api from "../../../../api/api";
import { PostComment } from "../../../../types/comment";
import { useAuthStore } from "../../../../stores/authStore";
import { useModalStore } from "../../../../stores/modalStore";
import { useNavigate } from "react-router-dom";
interface CommentFormProps {
  onSubmit: (newComment: PostComment) => void;
  socialPostId: number;
  accessToken: string | null;
}

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  socialPostId,
}) => {
  const token = localStorage.getItem("accessToken");
  const [commentValue, setCommentValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { isLoggedIn, checkAuth, user } = useAuthStore();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const minHeight = 40;
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`;
    }
  };

  const onCommentInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    checkAuth();
    if (!isLoggedIn) {
      openModal(
        "로그인이 필요한 서비스입니다.\n 로그인 하러 가시겠어요?",
        "취소하기",
        "로그인하기",
        () => navigate("/login")
      );
      return;
    }
    const textarea = textareaRef.current;
    if (!textarea) return;
    const inputValue = (event.target as HTMLTextAreaElement).value;
    if (inputValue.match(/^\s+/)) {
      textarea.value = "";
      return;
    }
    setCommentValue(inputValue);
    adjustTextareaHeight();
  };

  const onCommentBlur = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const trimmed = textarea.value.trim();
    setCommentValue(trimmed);
    if (!trimmed) {
      textarea.style.height = "40px";
    } else {
      adjustTextareaHeight();
    }
  };

  const handleCommentSubmit = async () => {
    if (commentValue.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        const response = await api.post(
          `/api/socialPosts/${socialPostId}/comments`,
          {
            content: commentValue.trim(),
          },
          {
            headers: {
              Authorization: token,
              "Content-type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          const newComment = response.data.data;
          onSubmit(newComment);
          setCommentValue("");
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
          }
        }
      } catch (error) {
        console.error("댓글 등록에 실패했습니다.", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center gap-6 mb-[60px]">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden userProfile-shadow ">
          <img
            className="w-full h-full object-cover bg-center"
            src={user.profileImage || "/default-image.png"}
            alt="유저 프로필 이미지"
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommentSubmit();
          }}
          className="flex gap-[14px] items-center"
        >
          <textarea
            ref={textareaRef}
            value={commentValue}
            onInput={onCommentInput}
            onBlur={onCommentBlur}
            className="w-[907px] h-10 min-h-[40px] border-b border-gray-30 p-2 placeholder:pl-[6px] body-small-r break-words resize-none focus:border-blue-1 focus:placeholder:text-transparent"
            placeholder="댓글을 입력하세요."
            disabled={isSubmitting}
          />
          <ShortButton text="댓글 등록" textColor="base-1" bgColor="blue-1" />
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
