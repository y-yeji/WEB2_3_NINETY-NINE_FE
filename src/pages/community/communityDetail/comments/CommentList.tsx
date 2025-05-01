import React, { useState, useRef, useEffect } from "react";
import api from "../../../../api/api";
import { PostComment } from "../../../../types/comment";
import { useAuthStore } from "../../../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../../../stores/modalStore";
import Icon from "../../../../assets/icons/Icon";
import { formatCommentDate } from "../../../../utils/commentDateUtils";

interface CommentListProps {
  comments: PostComment[];
  setComments: React.Dispatch<React.SetStateAction<PostComment[]>>;
  socialPostId: number;
  accessToken: string;
  onCommentUpdate: () => void;
  onCommentDelete: () => void;
  isLoggedIn?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  setComments,
  socialPostId,
  accessToken,
  onCommentUpdate,
  onCommentDelete,
  isLoggedIn = false,
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
        `로그인이 필요한 서비스입니다.
        로그인 하러 가시겠어요?`,
        "취소하기",
        "로그인하기",
        () => navigate("/login")
      );
      return;
    }

    openModal(
      `댓글을 삭제하시면 더 이상 볼 수 없습니다.
      정말 삭제 하시겠어요?`,
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
      {comments.length === 0 ? (
        <div className="text-center py-10 text-gray-40">
          첫 번째 댓글을 작성해보세요!
        </div>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="p-5 border-b border-gray-30 relative"
            >
              <div className="flex justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-[25px] h-[25px] rounded-full overflow-hidden userProfile-shadow cursor-pointer"
                    onClick={() => handleUserProfileClick(comment.userId)}
                  >
                    <img
                      className="w-full h-full object-cover bg-center"
                      src={comment.userProfileImage || "/default-image.png"}
                      alt="유저프로필이미지"
                    />
                  </div>
                  <span
                    className="body-normal-m cursor-pointer"
                    onClick={() => handleUserProfileClick(comment.userId)}
                  >
                    {comment.userNickname}
                  </span>
                  <span className="caption-r text-gray-30">
                    {formatCommentDate(comment.createdAt)}
                  </span>
                </div>
                {isLoggedIn && user && user.id === comment.userId && (
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => toggleMenu(comment.id)}
                      className="text-blue-2"
                    >
                      <Icon name="EllipsisVertical" size={24} />
                    </button>
                    {menuOpenCommentId === comment.id && (
                      <ul className="absolute top-[25px] right-[9px] w-[114px] h-16 py-2 px-4 bg-white rounded border border-blue-7 body-small-r text-center">
                        <button
                          onClick={() => handleEditClick(comment)}
                          className="mb-2 hover:text-blue-4"
                        >
                          수정하기
                        </button>
                        <li>
                          <button
                            onClick={() => handleDeleteClick(comment.id)}
                            className=" hover:text-blue-4"
                          >
                            삭제하기
                          </button>
                        </li>
                      </ul>
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
