import { useEffect, useState } from "react";
import api from "../../../api/api";
import Comments from "./comments/Comments";
import PostDetail from "./PostDetail";
import { useParams } from "react-router-dom";
import ScrollToTopButton from "../../../components/ui/ScrollToTopButton";
import { PostCardProps } from "../../../types/post";

type PostDetailContent = PostCardProps["post"];

const CommunityDetail: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const [postDetailContent, setPostDetailContent] =
    useState<PostDetailContent | null>(null);
  const { postId } = useParams<{ postId: string }>();
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await api.get(`/api/socialPosts/${postId}`, {
          headers: {
            Authorization: token,
          },
        });
        setPostDetailContent(response.data.data);
        console.log("포스트상세페이지:", response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("포스트 내용을 가져오는데 실패했습니다.", error);
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPostDetails();
    }
  }, [postId, token]);

  if (isLoading) {
    return <div>Loading...</div>;
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
