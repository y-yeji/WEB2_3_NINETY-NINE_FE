import React, { useState } from "react";
import api from "../../../../api/api";
import { PostComment } from "../../../../types/comment";
import { useAuthStore } from "../../../../stores/authStore";

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
    <form onSubmit={handleSubmit} className="mb-10">
      <div className="mb-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[104px] p-4 border border-gray-20 rounded-lg resize-none"
          placeholder="댓글을 입력하세요"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className={`px-4 py-2 rounded text-white ${
            isSubmitting || !content.trim() ? "bg-gray-40" : "bg-blue-1"
          }`}
        >
          {isSubmitting ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
