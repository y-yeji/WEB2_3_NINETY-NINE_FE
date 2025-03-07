import { useEffect, useState } from "react";
import api from "../../api/api";
import Comments from "./Comments";
import PostDetail from "./PostDetail";
import { useParams } from "react-router-dom";
import ScrollToTopButton from "../../components/ui/ScrollToTopButton";

interface CommunityDetail {
  id: number;
  userId: number;
  title: string;
  content: string;
  imageUrls: string[];
  viewCount: number;
  commentCount: number;
  likeCount: number;
  userNickname: string;
  userProfileImage: string;
  likeStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

const CommunityDetail: React.FC = () => {
  const token = localStorage.getItem("accessToken");
  const [postDetailContent, setPostDetailContent] =
    useState<CommunityDetail | null>(null);
  const { socialPostId } = useParams<{ socialPostId: string }>();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await api.get(`/api/socialPosts/${socialPostId}`, {
          headers: {
            Authorization: token,
          },
        });
        setPostDetailContent(response.data.data);
        console.log("포스트상세페이지:", response.data);
      } catch (error) {
        console.error("포스트 내용을 가져오는데 실패했습니다.", error);
      }
    };

    if (socialPostId) {
      fetchPostDetails();
    }
  }, [socialPostId, token]);

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
      <PostDetail
        postDetail={postDetailContent}
        socialPostId={socialPostId || ""}
        onLikeToggle={handleLikeToggle}
      />
      {socialPostId && (
        <Comments
          socialPostId={parseInt(socialPostId)}
          onCommentCountChange={handleCommentCountChange}
        />
      )}
      <ScrollToTopButton />
    </article>
  );
};

export default CommunityDetail;
