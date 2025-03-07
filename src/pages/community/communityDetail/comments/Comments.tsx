import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import api from "../../../../api/api";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../../components/ui/Pagination";
import { PostComment } from "../../../../types/comment";

interface CommentsProps {
  socialPostId: number;
  onCommentCountChange: (newCount: number) => void;
}

const Comments: React.FC<CommentsProps> = ({
  socialPostId,
  onCommentCountChange,
}) => {
  const token = localStorage.getItem("accessToken");
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchPostComment = async (page: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `api/socialPosts/${socialPostId}/comments`,
          {
            params: {
              pageNum: page - 1,
              pageSize: 9,
            },
          }
        );

        if (response.data && response.data.data) {
          const commentsData = response.data.data.comments || [];
          setComments(commentsData);
          console.log("댓글리스트:", response.data.data, comments);
          if (response.data.data.totalElements !== undefined) {
            setTotalItems(response.data.data.totalElements);
            onCommentCountChange(response.data.data.totalElements);
          } else {
            setTotalItems(commentsData.length);
            onCommentCountChange(commentsData.length);
          }
        } else {
          setComments([]);
          setTotalItems(0);
          onCommentCountChange(0);
        }
      } catch (error) {
        console.error("댓글 목록을 가져오는데 실패했습니다.", error);
        setError("댓글을 불러오는 중 오류가 발생했습니다.");
        setComments([]);
        setTotalItems(0);
      } finally {
        setIsLoading(false);
      }
    };

    if (socialPostId) {
      fetchPostComment(currentPage);
    }
  }, [socialPostId, currentPage]);

  const handleCommentSubmit = (newComment: PostComment) => {
    // 새 댓글을 목록 맨 앞에 추가
    setComments((prevComments) => [newComment, ...prevComments]);
    // 댓글 수 업데이트 (현재 댓글 수 + 1)
    onCommentCountChange(comments.length + 1);
  };

  const handleCommentUpdate = () => {
    // 댓글 수 변경 없음, 내용만 업데이트
    onCommentCountChange(comments.length);
  };

  const handleCommentDelete = () => {
    // 댓글 삭제 후 카운트 감소
    onCommentCountChange(comments.length - 1);
  };

  if (isLoading) {
    return (
      <div className="body-small-r text-center py-4">
        댓글을 불러오는 중 입니다.
      </div>
    );
  }

  if (error) {
    return (
      <div className="body-small-r text-center py-4 text-red-500">{error}</div>
    );
  }
  const onPageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <>
      <CommentForm
        onSubmit={handleCommentSubmit}
        socialPostId={socialPostId}
        accessToken={token || ""}
      />
      <CommentList
        comments={comments}
        setComments={setComments}
        socialPostId={socialPostId}
        accessToken={token || ""}
        onCommentUpdate={handleCommentUpdate}
        onCommentDelete={handleCommentDelete}
      />
      {totalItems > 9 && (
        <div className="my-16">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={9}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
};

export default Comments;
