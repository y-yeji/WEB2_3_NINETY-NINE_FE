import { useEffect, useState } from "react";
import api from "../../../api/api";
import Comments from "./comments/Comments";
import PostDetail from "./PostDetail";
import { useParams } from "react-router-dom";
import ScrollToTopButton from "../../../components/ui/ScrollToTopButton";
import { PostCardProps } from "../../../types/Post";

type PostDetailContent = PostCardProps["post"];

const CommunityDetail: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("accessToken");
  const [postDetailContent, setPostDetailContent] =
    useState<PostDetailContent | null>(null);
  const { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // 토큰이 있을 경우에만 헤더에 포함
        const headers = token ? { Authorization: token } : {};

        const response = await api.get(`/api/socialPosts/${postId}`, {
          headers,
        });

        setPostDetailContent(response.data.data);
        console.log("포스트상세페이지:", response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("포스트 내용을 가져오는데 실패했습니다.", error);
        setError("포스트를 불러오는 중 오류가 발생했습니다.");
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPostDetails();
    }
  }, [postId, token]);

  if (isLoading) {
    return (
      <div className="w-[1120px] mx-auto mt-[156px] text-center p-10">
        포스트를 불러오는 중입니다...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[1120px] mx-auto mt-[156px] text-center p-10 text-red-500">
        {error}
      </div>
    );
  }

  const handleLikeToggle = (newLikeStatus: boolean, newLikeCount: number) => {
    setPostDetailContent((prev) =>
      prev
        ? { ...prev, likeStatus: newLikeStatus, likeCount: newLikeCount }
        : null
    );
  };

  const handleCommentCountChange = (newCount: number) => {
    setPostDetailContent((prev) =>
      prev ? { ...prev, commentCount: newCount } : null
    );
  };

  return (
    <article className="w-[1120px] mx-auto mt-[156px]">
      {postDetailContent && (
        <PostDetail
          postDetail={postDetailContent}
          socialPostId={postId || ""}
          onLikeToggle={handleLikeToggle}
        />
      )}
      {postId && (
        <Comments
          socialPostId={parseInt(postId)}
          onCommentCountChange={handleCommentCountChange}
        />
      )}
      <ScrollToTopButton />
    </article>
  );
};

export default CommunityDetail;
