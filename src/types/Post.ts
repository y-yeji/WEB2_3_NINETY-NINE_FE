export interface PostCardProps {
  post: {
    id: number;
    userId: number;
    title: string;
    content: string;
    imageUrl?: string; //api 수정전까지 사용, 수정후 string[] 로 수정
    viewCount: number;
    commentCount: number;
    likeCount: number;
    userNickname?: string;
    userProfileImage?: string;
    createdAt: string;
    updatedAt: string;
    isLiked?: boolean;
    likeId?: number;
  };
  onLikeUpdate: (postId: number) => Promise<void>;
}