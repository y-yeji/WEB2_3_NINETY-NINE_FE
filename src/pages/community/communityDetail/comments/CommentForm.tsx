import React, { useState } from "react";
import api from "../../../../api/api";
import { PostComment } from "../../../../types/comment";
import { useAuthStore } from "../../../../stores/authStore";
import ShortButton from "../../../../components/ui/ShortButton";

interface CommentFormProps {
  onSubmit: (comment: PostComment) => void;
  socialPostId: number;
  accessToken: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  socialPostId,
  accessToken,
}) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post(
        `api/socialPosts/${socialPostId}/comments`,
        { content },
        { headers: { Authorization: accessToken } }
      );

      const newComment = response.data.data;

      // 사용자 정보가 댓글 응답에 없는 경우 추가
      if (newComment && user) {
        newComment.userNickname = newComment.userNickname || user.nickname;
        newComment.userProfileImage =
          newComment.userProfileImage || user.profileImage;
      }

      onSubmit(newComment);
      setContent("");
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex xm:justify-around sm:justify-center items-end max-xm:gap-2 xm:gap-2 sm:gap-[18px] mb-[60px]">
      <div className="w-[50px] h-[50px] rounded-full overflow-hidden userProfile-shadow ">
        <img
          className="w-full h-full object-cover bg-center"
          src={user?.s3Bucket || "/default-image.png"}
          alt="유저 프로필 이미지"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-[1184px] max-xm:gap-4 xm:gap-4 sm:gap-6"
      >
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            className="w-full h-10 min-h-[40px] border-b border-gray-30 p-2 placeholder:pl-[6px] body-small-r break-words resize-none focus:border-blue-1 focus:placeholder:text-transparent"
            placeholder="댓글을 입력하세요"
          />
        </div>
        <ShortButton text="댓글 등록" textColor="base-1" bgColor="blue-1" />
      </form>
    </div>
  );
};

export default CommentForm;
