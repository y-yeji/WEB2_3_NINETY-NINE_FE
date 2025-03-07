export interface PostComment {
  id: number;
  socialPostId: number;
  userId: number;
  userNickname: string;
  userProfileImage: string;
  createdAt: string;
  content: string;
  totalPages: number;
  totalElements: number;
  pageNum: number;
  pageSize: number;
  numberOfElements: number;
}
