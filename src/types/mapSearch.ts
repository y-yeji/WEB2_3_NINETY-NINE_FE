export interface MapSearchRequest {
  region?: string;
  status?: string;
  titleKeyword?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  pageNum?: number;
  pageSize?: number;
}

export interface MapPost {
  id: number;
  genre: string;
  postUrl: string;
  ageRating: string;
  title: string;
  startDate: string;
  endDate: string;
  operatingHours: string;
  location: string;
  venue: string;
  status: string;
  ticketingWebSite: string;
  price: string;
  detailImage: string;
  description: string;
  bookmarked: boolean;
  latitude?: number;
  longitude?: number;
  category: string;
  apiCategory?: string;
}

export interface MapSearchResponse {
  posts: MapPost[];
  totalPages: number;
  totalElements: number;
  pageNum: number;
  pageSize: number;
  numberOfElements: number;
}
