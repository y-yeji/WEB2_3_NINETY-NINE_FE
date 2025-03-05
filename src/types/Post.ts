export interface PostCardProps {
  post: {
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
  };
  onLikeToggle: (
    postId: number,
    newLikeStatus: boolean,
    newLikeCount: number
  ) => void;
}
