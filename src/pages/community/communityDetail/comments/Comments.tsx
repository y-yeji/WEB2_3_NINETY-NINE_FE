import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import api from "../../../../api/api";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "../../../../components/ui/Pagination";
import { PostComment } from "../../../../types/comment";
import { useAuthStore } from "../../../../stores/authStore";
import { useModalStore } from "../../../../stores/modalStore";

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
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostComment = async (page: number) => {
      setIsLoading(true);
      setError(null);
      try {
        // 토큰이 없어도 댓글 목록은 조회 가능하도록 변경
        const headers = token ? { Authorization: token } : {};

        const response = await api.get(
          `api/socialPosts/${socialPostId}/comments`,
          {
            params: {
              pageNum: page - 1,
              pageSize: 9,
            },
            headers,
          }
        );

        if (response.data && response.data.data) {
          const commentsData = response.data.data.comments || [];
          setComments(commentsData);
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
  }, [socialPostId, currentPage, token]);

  const handleCommentSubmit = (newComment: PostComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    onCommentCountChange(totalItems + 1);
    setTotalItems((prev) => prev + 1);
  };

  const handleCommentUpdate = () => {
    onCommentCountChange(totalItems);
  };

  const handleCommentDelete = () => {
    onCommentCountChange(totalItems - 1);
    setTotalItems((prev) => prev - 1);
  };

  const handleLoginRedirect = () => {
    openModal(
      "로그인이 필요한 서비스입니다.\n로그인 하러 가시겠어요?",
      "취소하기",
      "로그인하기",
      () => navigate("/login")
    );
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
        isLoggedIn={isLoggedIn}
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
