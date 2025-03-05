import { useRef, useState } from "react";
import ShortButton from "../../components/ui/ShortButton";
import api from "../../api/api";
import { useAuthStore } from "../../stores/authSotre";

interface PostComment {
  id: number;
  userNickname: string;
  createdAt: string;
  content: string;
}

interface CommentFormProps {
  onSubmit: (newComment: PostComment) => void;
  socialPostId: number;
  accessToken: string | null;
}

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  socialPostId,
}) => {
  const { accessToken } = useAuthStore();
  const [commentValue, setCommentValue] = useState("");
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

  const handleCommentSubmit = async () => {
    if (commentValue.trim()) {
      try {
        const response = await api.post(
          `/api/socialPosts/${socialPostId}/comments`,
          {
            content: commentValue.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const newComment = response.data;
          onSubmit(newComment);
          setCommentValue("");
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
          }
        }
      } catch (error) {
        console.error("댓글 등록에 실패했습니다.", error);
      }
    }
  };
  return (
    <div>
      <div className="flex items-center gap-6 mb-[60px]">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden userProfile-shadow ">
          <img
            className="w-full h-full object-cover bg-center"
            src="/default-image.png"
            alt="유저 프로필 이미지"
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommentSubmit();
          }}
          className="flex gap-[14px]"
        >
          <textarea
            ref={textareaRef}
            value={commentValue}
            onInput={onCommentInput}
            onBlur={onCommentBlur}
            className="w-[907px] h-10 min-h-[40px] border-b border-gray-30 p-2 placeholder:pl-[6px] body-small-r break-words resize-none focus:border-blue-1"
            placeholder="댓글을 입력하세요."
          />
          <ShortButton text="댓글 등록" textColor="base-1" bgColor="blue-1" />
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
