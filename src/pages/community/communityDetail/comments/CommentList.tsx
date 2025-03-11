import { useCommentActions } from "../../../../hooks/useCommentAction";
import { useCommentMenu } from "../../../../hooks/useCommentMenu";
import { useRealTimeDate } from "../../../../hooks/useRealTimeDate";
import { useAuthStore } from "../../../../stores/authStore";
import { PostComment } from "../../../../types/comment";
import { formatCommentDate } from "../../../../utils/commentDateUtils";
import CommentEditForm from "./CommentEditForm";
import CommentMenu from "./CommentMenu";

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
  const { user } = useAuthStore();
  const { openMenuId, toggleCommentMenu, menuRefs } = useCommentMenu();
  const {
    editingCommentId,
    editedContent,
    setEditedContent,
    handleEditClick,
    handleCancelEdit,
    handleEditComment,
    handleDeleteComment,
  } = useCommentActions(
    socialPostId,
    comments,
    setComments,
    onCommentUpdate,
    onCommentDelete
  );

  const isCommentAuthor = (comment: PostComment) => {
    return user && user.id === comment.userId;
  };

  return (
    <div>
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="relative">
            <div className="pl-1 border-b border-gray-30 mb-4">
              {/* 댓글 헤더 (작성자 정보 및 메뉴) */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[6px] mr-[10px] mb-[9px]">
                  <div className="w-[25px] h-[25px] rounded-full overflow-hidden userProfile-shadow">
                    <img
                      className="w-full h-full object-cover bg-center"
                      src={comment.userProfileImage || "/default-image.png"}
                      alt="유저프로필이미지"
                    />
                  </div>
                  <span className="body-normal-m">{comment.userNickname}</span>
                  <span className="caption-r text-gray-30">
                    {formatCommentDate(comment.createdAt)}
                  </span>
                </div>

                {/* 작성자인 경우에만 메뉴 버튼 표시 */}
                {isCommentAuthor(comment) && (
                  <CommentMenu
                    commentId={comment.id}
                    content={comment.content}
                    isOpen={openMenuId === comment.id}
                    onToggle={toggleCommentMenu}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteComment}
                    menuRef={(el) => {
                      menuRefs.current[comment.id] = el;
                    }}
                  />
                )}
              </div>

              {/* 댓글 내용 또는 수정 폼 */}
              {editingCommentId === comment.id ? (
                <CommentEditForm
                  content={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  onCancel={handleCancelEdit}
                  onSave={() => handleEditComment(comment.id)}
                />
              ) : (
                <p className="mb-[10px] px-3">{comment.content}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center my-20">
          아직 댓글이 없습니다.
          <span className="block mt-2 body-small-r text-gray-40">
            말을 걸어 소통을 시작해보세요.
          </span>
        </p>
      )}
    </div>
  );
};

export default CommentList;
