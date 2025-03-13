import React, { useState, useRef, useEffect } from "react";
import { formatDate } from "../../../../utils/dateUtils";
import api from "../../../../api/api";
import { PostComment } from "../../../../types/comment";
import { useAuthStore } from "../../../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../../../stores/modalStore";
import Icon from "../../../../assets/icons/Icon";

interface CommentListProps {
  comments: PostComment[];
  setComments: React.Dispatch<React.SetStateAction<PostComment[]>>;
  socialPostId: number;
  accessToken: string;
  onCommentUpdate: () => void;
  onCommentDelete: () => void;
  isLoggedIn?: boolean; // 새로 추가된 prop
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  setComments,
  socialPostId,
  accessToken,
  onCommentUpdate,
  onCommentDelete,
  isLoggedIn = false, // 기본값 설정
}) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [menuOpenCommentId, setMenuOpenCommentId] = useState<number | null>(
    null
  );
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpenCommentId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditClick = (comment: PostComment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
    setMenuOpenCommentId(null);
  };

  const handleEditSubmit = async (commentId: number) => {
    if (!isLoggedIn) {
      openModal(
        "로그인이 필요한 서비스입니다.\n로그인 하러 가시겠어요?",
        "취소하기",
        "로그인하기",
        () => navigate("/login")
      );
      return;
    }

    try {
      const response = await api.put(
        `api/socialPosts/${socialPostId}/comments/${commentId}`,
        { content: editedContent },
        { headers: { Authorization: accessToken } }
      );

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedContent }
            : comment
        )
      );
      setEditingCommentId(null);
      onCommentUpdate();
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const handleDeleteClick = (commentId: number) => {
    if (!isLoggedIn) {
      openModal(
        "로그인이 필요한 서비스입니다.\n로그인 하러 가시겠어요?",
        "취소하기",
        "로그인하기",
        () => navigate("/login")
      );
      return;
    }

    openModal(
      "댓글을 삭제하시면 더 이상 볼 수 없습니다.\n정말 삭제 하시겠어요?",
      "취소 하기",
      "삭제 하기",
      async () => {
        try {
          const response = await api.delete(
            `api/socialPosts/${socialPostId}/comments/${commentId}`,
            { headers: { Authorization: accessToken } }
          );
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          );
          onCommentDelete();
        } catch (error) {
          console.error("댓글 삭제 실패:", error);
        }
      }
    );
    setMenuOpenCommentId(null);
  };

  const toggleMenu = (commentId: number) => {
    setMenuOpenCommentId(menuOpenCommentId === commentId ? null : commentId);
  };

  const handleUserProfileClick = (userId: number) => {
    if (user && user.id === userId) {
      navigate("/mypage");
    } else {
      navigate(`/userpage/${userId}`);
    }
  };

  return (
    <div className="commentList">
      <h3 className="text-blue-4 mb-5">댓글</h3>
      {comments.length === 0 ? (
        <div className="text-center py-10 text-gray-60">
          첫 번째 댓글을 작성해보세요!
        </div>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="p-5 border-t border-gray-20 relative"
            >
              <div className="flex justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-[30px] h-[30px] rounded-full overflow-hidden cursor-pointer"
                    onClick={() => handleUserProfileClick(comment.userId)}
                  >
                    <img
                      src={comment.userProfileImage || "/default-image.png"}
                      alt="프로필 이미지"
                      className="w-full h-full object-cover bg-center"
                    />
                  </div>
                  <div>
                    <div
                      className="font-bold cursor-pointer"
                      onClick={() => handleUserProfileClick(comment.userId)}
                    >
                      {comment.userNickname}
                    </div>
                    <div className="text-xs text-gray-60">
                      {formatDate(comment.createdAt)}
                    </div>
                  </div>
                </div>
                {isLoggedIn && user && user.id === comment.userId && (
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => toggleMenu(comment.id)}
                      className="text-gray-60"
                    >
                      <Icon name="EllipsisVertical" size={24} />
                    </button>
                    {menuOpenCommentId === comment.id && (
                      <div className="absolute right-0 w-24 bg-white border border-gray-20 rounded shadow-md z-10">
                        <button
                          onClick={() => handleEditClick(comment)}
                          className="block w-full text-left p-2 hover:bg-gray-10"
                        >
                          수정하기
                        </button>
                        <button
                          onClick={() => handleDeleteClick(comment.id)}
                          className="block w-full text-left p-2 hover:bg-gray-10"
                        >
                          삭제하기
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {editingCommentId === comment.id ? (
                <div className="mt-4">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-3 border border-gray-20 rounded-md resize-none h-24"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="px-4 py-2 border border-gray-20 rounded"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleEditSubmit(comment.id)}
                      className="px-4 py-2 bg-blue-1 text-white rounded"
                    >
                      저장
                    </button>
                  </div>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{comment.content}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
