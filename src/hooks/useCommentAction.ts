import { useState } from "react";
import api from "../api/api";
import { PostComment } from "../types/comment";

export function useCommentActions(
  socialPostId: number,
  comments: PostComment[],
  setComments: React.Dispatch<React.SetStateAction<PostComment[]>>,
  onCommentUpdate: () => void,
  onCommentDelete: () => void
) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const token = localStorage.getItem("accessToken");

  const handleEditClick = (
    e: React.MouseEvent,
    commentId: number,
    content: string
  ) => {
    e.stopPropagation();
    setEditingCommentId(commentId);
    setEditedContent(content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  const handleEditComment = async (commentId: number) => {
    try {
      const response = await api.put(
        `/api/socialPosts/${socialPostId}/comments/${commentId}`,
        { content: editedContent },
        {
          headers: {
            Authorization: token,
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const updatedComments = comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedContent }
            : comment
        );
        setComments(updatedComments);
        setEditingCommentId(null);
        setEditedContent("");
        onCommentUpdate();
      }
    } catch (error) {
      console.error("댓글 수정을 실패했습니다.", error);
    }
  };

  const handleDeleteComment = async (
    e: React.MouseEvent,
    commentId: number
  ) => {
    e.stopPropagation();
    try {
      const response = await api.delete(
        `/api/socialPosts/${socialPostId}/comments/${commentId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId
        );
        setComments(updatedComments);
        onCommentDelete();
      }
    } catch (error) {
      console.error("댓글 삭제를 실패했습니다.", error);
    }
  };

  return {
    editingCommentId,
    editedContent,
    setEditedContent,
    handleEditClick,
    handleCancelEdit,
    handleEditComment,
    handleDeleteComment,
  };
}
