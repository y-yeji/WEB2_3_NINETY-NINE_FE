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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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

    if (screenWidth >= 640) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (screenWidth >= 640) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [screenWidth]);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
                    <div>
                      {menuOpenCommentId && screenWidth < 640 && (
                        <div className="fixed inset-0 bg-blue-7/30 z-5 transition-opacity duration-300" />
                      )}
                      <ul
                        className={`sm:hidden max-xm:w-full xm:w-full max-xm:h-[158px] xm:h-[158px] max-xm:py-5 xm:py-5 max-xm:px-5 xm:px-5 fixed left-0 right-0 bottom-0 bg-white rounded-t-lg border border-blue-7 body-small-r text-center z-30 transition-transform duration-300 ease-in-out
                        ${menuOpenCommentId === comment.id ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                        style={{ willChange: "transform, opacity" }}
                      >
                        <button
                          onClick={() => handleEditClick(comment)}
                          className="mb-4 hover:text-blue-4"
                        >
                          댓글 수정
                        </button>
                        <li>
                          <button
                            onClick={() => handleDeleteClick(comment.id)}
                            className="mb-[22px] hover:text-blue-4"
                          >
                            댓글 삭제
                          </button>
                        </li>
                        <li className="max-w:[333px] h-10 py-2 border border-blue-7 rounded-lg text-blue-4 ">
                          <button
                            className="w-full"
                            onClick={() => toggleMenu(comment.id)}
                          >
                            닫기
                          </button>
                        </li>
                      </ul>
                      <ul
                        className={`hidden sm:block ${menuOpenCommentId === comment.id ? "sm:block" : "sm:hidden"} w-[114px] h-16 absolute top-[26px] right-2 py-2 px-4 bg-white rounded border border-blue-7 body-small-r text-center z-30`}
                      >
                        <button
                          onClick={() => handleEditClick(comment)}
                          className="mb-2 hover:text-blue-4"
                        >
                          댓글 수정
                        </button>
                        <li>
                          <button
                            onClick={() => handleDeleteClick(comment.id)}
                            className=" hover:text-blue-4"
                          >
                            댓글 삭제
                          </button>
                        </li>
                      </ul>
                    </div>
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
                      className="px-4 py-2 body-small-r border border-gray-20 rounded"
                    >
                      수정 취소
                    </button>
                    <button
                      onClick={() => handleEditSubmit(comment.id)}
                      className="px-4 py-2 body-small-r bg-blue-1 text-white rounded"
                    >
                      댓글 등록
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
