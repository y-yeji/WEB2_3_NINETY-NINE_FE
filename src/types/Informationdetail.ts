export interface ShowInfo {
  posterUrl: string;
  title: string;
  audience: string;
  period: string;
  location: string;
  times: string;
  links: Array<{ siteName: string; url: string }> | string; // 기존 코드와의 호환성을 위해 string도 허용
  price: string;
  reviewCount: number;
  isBookmarked: boolean;
  genre: string;
}
