import { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import Icon from "../../assets/icons/Icon";

interface PostComment {
  id: number;
  userNickname: string;
  createdAt: string;
  content: string;
}

interface CommentListProps {
  comments: PostComment[];
  setComments: React.Dispatch<React.SetStateAction<PostComment[]>>;
  socialPostId: number;
  accessToken: string;
  onCommentUpdate: () => void;
  onCommentDelete: () => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  socialPostId,
  setComments,
  onCommentUpdate,
  onCommentDelete,
}) => {
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleCommentMenu = () => {
    setIsCommentMenuOpen(!isCommentMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsCommentMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditComment = async (commentId: number) => {
    try {
      const response = await api.put(
        `/api/socialPosts/${socialPostId}/comments/${commentId}`,
        { content: editedContent },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("댓글이 수정되었습니다.", response.data);
        const updatedComments = comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedContent }
            : comment
        );
        setComments(updatedComments);
        setEditingCommentId(null);
        setEditedContent("");
        setIsCommentMenuOpen(false);
        onCommentUpdate();
      }
    } catch (error) {
      console.error("댓글 수정을 실패했습니다.", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await api.delete(
        `/api/socialPosts/${socialPostId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("댓글 삭제가 완료되었습니다.", response.data);
        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId
        );
        setComments(updatedComments);
        setIsCommentMenuOpen(false);
        onCommentDelete();
      }
    } catch (error) {
      console.error("댓글 삭제를 실패했습니다.", error);
    }
  };
  return (
    <div>
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
                <span className="body-normal-m">{comment.userNickname}</span>
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
                <button onClick={() => handleEditComment(comment.id)}>
                  댓글 수정
                </button>
              </li>
              <li className=" hover:text-blue-4">
                <button onClick={() => handleDeleteComment(comment.id)}>
                  댓글 삭제
                </button>
              </li>
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
export default CommentList;
