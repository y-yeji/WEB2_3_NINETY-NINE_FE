export interface MapSearchRequest {
  region?: string; // 지역 (예: 서울, 부산 등)
  status?: string; // 상태 (예: 진행중, 진행 예정 등)
  titleKeyword?: string; // 제목 검색 키워드
  latitude?: number; // 위도
  longitude?: number; // 경도
  radius?: number; // 검색 반경 (km)
  pageNum?: number; // 페이지 번호 (0부터 시작)
  pageSize?: number; // 한 페이지당 결과 수
}

export interface MapPost {
  id: number; // 게시글 ID
  genre: string; // 장르
  postUrl: string; // 포스터 이미지 URL
  ageRating: string; // 연령 제한
  title: string; // 제목
  startDate: string; // 시작 날짜
  endDate: string; // 종료 날짜
  operatingHours: string; // 운영 시간
  location: string; // 위치 (지역명)
  venue: string; // 장소명
  status: string; // 상태 (진행 중, 진행 예정 등)
  ticketingWebSite: string; // 티켓팅 웹사이트
  price: string; // 가격 정보
  detailImage: string; // 상세 이미지 URL
  description: string | null; // 설명
  bookmarked: boolean; // 북마크 여부
  latitude: number; // 위도
  longitude: number; // 경도
  distance?: number; // 현재 위치로부터의 거리 (km)
}

export interface MapSearchResponse {
  posts: MapPost[]; // 조회된 게시글 목록
  totalPages: number; // 전체 페이지 수
  totalElements: number; // 전체 조회된 게시글 개수
  pageNum: number; // 현재 페이지 번호
  pageSize: number; // 한 페이지당 게시글 개수
  numberOfElements: number; // 현재 페이지에 포함된 게시글 개수
}
