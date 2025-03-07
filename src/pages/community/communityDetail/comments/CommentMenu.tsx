import Icon from "../../../../assets/icons/Icon";

interface CommentMenuProps {
  commentId: number;
  content: string;
  isOpen: boolean;
  onToggle: (commentId: number) => void;
  onEdit: (e: React.MouseEvent, commentId: number, content: string) => void;
  onDelete: (e: React.MouseEvent, commentId: number) => void;
  menuRef: (el: HTMLDivElement | null) => void;
}

const CommentMenu: React.FC<CommentMenuProps> = ({
  commentId,
  content,
  isOpen,
  onToggle,
  onEdit,
  onDelete,
  menuRef,
}) => {
  return (
    <div ref={menuRef} className="relative">
      <button onClick={() => onToggle(commentId)}>
        <Icon name="EllipsisVertical" size={24} className="text-blue-1" />
      </button>
      {isOpen && (
        <ul className="w-[114px] h-16 absolute top-[29px] right-2 py-[7px] px-7 bg-white rounded border border-blue-7 body-small-r text-center">
          <li className="mb-2 hover:text-blue-4">
            <button onClick={(e) => onEdit(e, commentId, content)}>
              댓글 수정
            </button>
          </li>
          <li className="hover:text-blue-4">
            <button onClick={(e) => onDelete(e, commentId)}>댓글 삭제</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CommentMenu;
