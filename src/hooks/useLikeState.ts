import { useEffect, useState } from "react";
import api from "../api/api";

export const useLikeState = (
  postId: number,
  initialLikeStatus: boolean,
  initalLikeCount: number
) => {
  const token = localStorage.getItem("accessToken");
  const [isLiked, setIsLiked] = useState(() => {
    const saved = localStorage.getItem(`post_${postId}_likeStatus`);
    return saved !== null ? JSON.parse(saved) : initialLikeStatus;
  });

  const [likeCount, setLikeCount] = useState(() => {
    const saved = localStorage.getItem(`post_${postId}_likeCount`);
    return saved !== null ? JSON.parse(saved) : initalLikeCount;
  });

  useEffect(() => {
    localStorage.setItem(`post_${postId}_likeStatus`, JSON.stringify(isLiked));
    localStorage.setItem(`post_${postId}_likeCount`, JSON.stringify(likeCount));
  }, [postId, isLiked, likeCount]);

  const toggleLike = async () => {
    try {
      const response = await api.post(
        `api/socialPosts/${postId}/likes`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 201) {
        setIsLiked(true);
        setLikeCount((prev: number) => prev + 1);
        console.log(
          "좋아요 추가 성공",
          response.data.success,
          response.data.code
        );
        return {
          success: true,
          newLikeStatus: true,
          newLikeCount: likeCount + 1,
        };
      } else if (response.status === 200) {
        setIsLiked(false);
        setLikeCount((prev: number) => prev - 1);
        console.log(
          "좋아요 삭제 성공",
          response.data.success,
          response.data.code
        );
      } else {
        console.error("예상치도 못한 응답상태", response.status);
        return { status: false };
      }
    } catch (error) {
      console.error("좋아요 토글 오류", error);
    }
  };
  return { isLiked, likeCount, toggleLike };
};
