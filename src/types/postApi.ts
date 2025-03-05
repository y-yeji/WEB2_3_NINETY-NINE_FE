import { PostCardProps } from "./post";

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

export interface PostsData {
  posts: PostCardProps["post"][];
  totalPages: number;
  totalElements: number;
  pageNum: number;
  pageSize: number;
  numberOfElements: number;
}

export type SocialCommunityResponse = ApiResponse<PostsData>;
