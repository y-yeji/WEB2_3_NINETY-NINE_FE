export interface Review {
  id: number;
  userId: string;
  username: string;
  date: string;
  rating: number;
  content: string;
  image?: string;
  isMyReview: boolean;
}
