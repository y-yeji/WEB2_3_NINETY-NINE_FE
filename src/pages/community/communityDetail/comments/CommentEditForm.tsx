interface CommentEditFormProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCancel: () => void;
  onSave: () => void;
}

const CommentEditForm: React.FC<CommentEditFormProps> = ({
  content,
  onChange,
  onCancel,
  onSave,
}) => {
  return (
    <div className="mb-[15px]">
      <textarea
        value={content}
        onChange={onChange}
        className="w-full p-2 border border-gray-30 rounded resize-none"
      />
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={onCancel}
          className="px-2 py-1 text-sm border border-gray-30 rounded"
        >
          취소
        </button>
        <button
          onClick={onSave}
          className="px-2 py-1 text-sm bg-blue-1 text-white rounded"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default CommentEditForm;
