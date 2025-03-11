export interface Notification {
  userId: number;
  type: string;
  content: string;
  relatedId: number;
  read: boolean;
  ceatedAt: string;
}
