import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import api from "../../api/api";

interface PostComment {
  id: number;
  userNickname: string;
  createdAt: string;
  content: string;
}

interface CommentsProps {
  socialPostId: number;
  onCommentCountChange: (newCount: number) => void;
}

const Comments: React.FC<CommentsProps> = ({
  socialPostId,
  onCommentCountChange,
}) => {
  const [comments, setComments] = useState<PostComment[]>([]);

  const fecthPostComment = async () => {
    try {
      const response = await api.get<PostComment[]>(
        `api/socialPosts/${socialPostId}/comments`
      );
      setComments(response.data);
      onCommentCountChange(response.data.length);
    } catch (error) {
      console.error("댓글 목록을 가져오는데 실패했습니다.", error);
    }
  };
  useEffect(() => {
    fecthPostComment();
  }, [socialPostId]);

  const handleCommentSubmit = (newComment: PostComment) => {
    setComments((preveComments) => [newComment, ...preveComments]);
    onCommentCountChange(comments.length + 1);
  };

  const handleCommentUpdate = () => {
    onCommentCountChange(comments.length);
  };

  const handleCommentDelete = () => {
    onCommentCountChange(comments.length - 1);
  };

  return (
    <>
      <CommentForm
        onSubmit={handleCommentSubmit}
        socialPostId={socialPostId}
        accessToken={accessToken || ""}
      />
      <CommentList
        comments={comments}
        setComments={setComments}
        socialPostId={socialPostId}
        accessToken={accessToken || ""}
        onCommentUpdate={handleCommentUpdate}
        onCommentDelete={handleCommentDelete}
      />
    </>
  );
};
export default Comments;
