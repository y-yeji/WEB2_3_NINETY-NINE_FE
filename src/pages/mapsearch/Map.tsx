import Script from "./Script";
import { MapPost } from "../../types/mapSearch";
import { useKakaoMap } from "../../hooks/useKakaoMap";
import { useMapMarkers } from "../../hooks/useMapMarkers";

const KAKAO_APP_KEY = import.meta.env.VITE_APP_KAKAOMAP_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  center: { lat: number; lng: number };
  posts?: MapPost[];
}

const Map = ({ center, posts }: MapProps) => {
  // 카카오맵 초기화 및 기본 설정을 위한 커스텀 훅 사용
  const { container, mapRef } = useKakaoMap(center);

  // 마커 관리 및 표시를 위한 커스텀 훅 사용
  const { searchErrors } = useMapMarkers(mapRef, posts);

  return (
    <div>
      <Script
        async
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services&autoload=false`}
      />

      <div className="relative">
        <div ref={container} style={{ width: "1082px", height: "560px" }}></div>

        {Object.keys(searchErrors).length > 0 && (
          <p className="caption-r text-red mt-[15px] text-center">
            일부 위치를 찾을 수 없습니다.
          </p>
        )}

        <p className="caption-r text-gray-40 mt-[15px] text-right">
          표시된 위치는 실제 위치와 다를 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Map;

// import { useEffect, useRef, useState } from "react";
// import Script from "./Script";
// import { MapPost } from "../../types/mapSearch";

// const KAKAO_APP_KEY = import.meta.env.VITE_APP_KAKAOMAP_KEY;

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// interface MapProps {
//   center: { lat: number; lng: number };
//   posts?: MapPost[];
// }

// const Map = ({ center, posts }: MapProps) => {
//   const container = useRef<HTMLDivElement>(null);
//   const mapRef = useRef<any>(null);
//   const markersRef = useRef<any[]>([]);
//   const [searchErrors, setSearchErrors] = useState<Record<number, string>>({});

//   // 지도 초기화 함수
//   const initMap = () => {
//     if (!container.current) return;

//     const mapOptions = {
//       center: new window.kakao.maps.LatLng(center.lat, center.lng),
//       level: 10,
//     };

//     mapRef.current = new window.kakao.maps.Map(container.current, mapOptions);

//     // 지도 초기화 후 posts 처리
//     if (posts && posts.length > 0) {
//       processPostsLocations();
//     }
//   };

//   // 카카오맵 로드 함수
//   const loadKakaoMap = () => {
//     if (window.kakao && window.kakao.maps) {
//       window.kakao.maps.load(() => {
//         initMap();
//       });
//     }
//   };

//   // 카카오맵 스크립트 로드
//   useEffect(() => {
//     if (!window.kakao || !window.kakao.maps) {
//       const script = document.createElement("script");
//       script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services&autoload=false`;
//       script.async = true;
//       script.onload = loadKakaoMap;
//       document.head.appendChild(script);
//     } else {
//       loadKakaoMap();
//     }

//     return () => {
//       markersRef.current.forEach((marker) => marker.setMap(null));
//       markersRef.current = [];
//       mapRef.current = null;
//     };
//   }, [center]);

//   // 해시태그 추출 함수
//   const extractHashtags = (text: string): string[] => {
//     return text.match(/#([^\s]+)/g)?.map((tag) => tag.slice(1)) || [];
//   };

//   // 커스텀 HTML 템플릿 생성 함수
//   const createInfoWindowContent = (post: MapPost): string => {
//     console.log("createInfoWindowContent 호출됨:", post);
//     console.log("원본 설명:", post.description);

//     if (!post.description) {
//       console.warn("post.description이 없습니다.");
//       return "<div>설명 없음</div>";
//     }

//     const hashtags = extractHashtags(post.description); // # 뒤의 텍스트 추출
//     const hashtagText = hashtags.join(", "); // 쉼표로 연결

//     console.log("정제된 해시태그:", hashtags);

//     return `
//       <div style="padding:10px; font-size:14px; line-height:1.5;">
//         <strong>${post.description}</strong>
//         <p>${hashtagText || "해시태그 없음"}</p>
//       </div>
//     `;
//   };

//   // 좌표로 마커 추가 함수
//   const addMarkersWithCoords = (postsData: MapPost[]) => {
//     console.log("addMarkersWithCoords 호출됨:", postsData);

//     postsData.forEach((post) => {
//       console.log("마커 생성 중:", post);

//       const position = new window.kakao.maps.LatLng(
//         post.latitude,
//         post.longitude
//       );

//       const markerImage = new window.kakao.maps.MarkerImage(
//         "/location-marker.png",
//         new window.kakao.maps.Size(50, 50),
//         { offset: new window.kakao.maps.Point(25, 50) }
//       );

//       const marker = new window.kakao.maps.Marker({
//         position,
//         image: markerImage,
//         map: mapRef.current,
//       });

//       // 커스텀 HTML 템플릿 생성
//       const content = createInfoWindowContent(post);

//       const infowindow = new window.kakao.maps.InfoWindow({
//         content,
//       });

//       // 마커 클릭 이벤트 등록
//       window.kakao.maps.event.addListener(marker, "click", () => {
//         infowindow.open(mapRef.current, marker);
//       });

//       markersRef.current.push(marker);
//     });
//   };

//   // 위치 처리 함수
//   const processPostsLocations = () => {
//     markersRef.current.forEach((marker) => marker.setMap(null));
//     markersRef.current = [];

//     if (!posts || posts.length === 0) return;

//     // 좌표가 있는 posts는 직접 마커 표시
//     const postsWithCoords = posts.filter(
//       (post) => post.latitude && post.longitude
//     );

//     addMarkersWithCoords(postsWithCoords);

//     // venue나 location 정보만 있는 posts는 검색 후 마커 표시
//     const postsWithoutCoords = posts.filter(
//       (post) =>
//         (!post.latitude || !post.longitude) && (post.venue || post.location)
//     );

//     postsWithoutCoords.forEach((post) => {
//       searchAndAddMarker(post);
//     });
//   };

//   // 장소명/주소로 검색 후 마커 추가
//   const searchAndAddMarker = (post: MapPost) => {
//     const venueStr = post.venue || "";
//     const addressStr = post.location || "";

//     if (!venueStr && !addressStr) {
//       setSearchErrors((prev) => ({
//         ...prev,
//         [post.id]: "검색할 주소나 장소명이 없습니다.",
//       }));
//       return;
//     }

//     const searchQueries = generateSearchQueries(venueStr, addressStr);
//     if (searchQueries.length > 0) {
//       searchWithQueries(searchQueries, 0, post);
//     } else {
//       setSearchErrors((prev) => ({
//         ...prev,
//         [post.id]: "유효한 검색 쿼리를 생성할 수 없습니다.",
//       }));
//     }
//   };

//   // 주소 문자열 정제 함수
//   const cleanAddressString = (address: string): string => {
//     return address.replace(/\(.*?\)/g, "").trim();
//   };

//   // 주소에서 기본 주소 부분만 추출
//   const extractBaseAddress = (address: string): string => {
//     const roadAddressPattern = /([가-힣]+ [가-힣]+ [가-힣]+로 \d+(-\d+)?)/;
//     const roadMatch = address.match(roadAddressPattern);
//     if (roadMatch) return roadMatch[1];

//     const generalAddressPattern = /([가-힣]+ [가-힣]+ [가-힣]+[동|읍|면])/;
//     const generalMatch = address.match(generalAddressPattern);
//     if (generalMatch) return generalMatch[1];

//     return address;
//   };

//   // 장소명에서 주요 부분 추출
//   const extractMainPlaceName = (placeName: string): string => {
//     const mainPartPattern = /^[^(]+/;
//     const mainPartMatch = placeName.match(mainPartPattern);
//     if (mainPartMatch) return mainPartMatch[0].trim();
//     return placeName;
//   };

//   // 다양한 검색 쿼리 생성
//   const generateSearchQueries = (venue: string, address: string): string[] => {
//     const queries: string[] = [];

//     if (venue) {
//       queries.push(venue);
//       const cleanVenue = cleanAddressString(venue);
//       if (cleanVenue !== venue) queries.push(cleanVenue);

//       const mainPlaceName = extractMainPlaceName(venue);
//       if (mainPlaceName !== venue && mainPlaceName !== cleanVenue) {
//         queries.push(mainPlaceName);
//       }
//     }

//     if (address) {
//       queries.push(address);
//       const baseAddress = extractBaseAddress(address);
//       if (baseAddress !== address) queries.push(baseAddress);
//     }

//     if (venue && address) {
//       const mainPlaceName = extractMainPlaceName(venue);
//       const baseAddress = extractBaseAddress(address);
//       queries.push(`${mainPlaceName} ${baseAddress}`);
//     }

//     return queries.filter((q) => q.length > 0);
//   };

//   // 순차적으로 검색 시도
//   const searchWithQueries = (
//     queries: string[],
//     index: number,
//     post: MapPost
//   ) => {
//     if (!mapRef.current || index >= queries.length) {
//       setSearchErrors((prev) => ({
//         ...prev,
//         [post.id]: "모든 검색 시도가 실패했습니다.",
//       }));
//       return;
//     }

//     const query = queries[index];
//     // console.log(
//     //   `[${post.id}] 검색 시도 ${index + 1}/${queries.length}: "${query}"`
//     // );

//     const ps = new window.kakao.maps.services.Places();
//     ps.keywordSearch(query, (data: any, status: any) => {
//       if (status === window.kakao.maps.services.Status.OK) {
//         // 검색 성공
//         const firstResult = data[0];
//         const coords = new window.kakao.maps.LatLng(
//           firstResult.y,
//           firstResult.x
//         );

//         const markerImage = new window.kakao.maps.MarkerImage(
//           "/location-marker.png",
//           new window.kakao.maps.Size(50, 50),
//           { offset: new window.kakao.maps.Point(25, 50) }
//         );

//         const marker = new window.kakao.maps.Marker({
//           position: coords,
//           image: markerImage,
//           map: mapRef.current,
//         });

//         const infowindow = new window.kakao.maps.InfoWindow({
//           content: `<div style="padding:5px;font-size:12px;">${post.title}</div>`,
//         });

//         window.kakao.maps.event.addListener(marker, "click", () => {
//           infowindow.open(mapRef.current, marker);
//         });

//         markersRef.current.push(marker);

//         // 검색 오류 제거
//         setSearchErrors((prev) => {
//           const newErrors = { ...prev };
//           delete newErrors[post.id];
//           return newErrors;
//         });
//       } else {
//         // 다음 쿼리로 검색 시도
//         searchWithQueries(queries, index + 1, post);
//       }
//     });
//   };

//   return (
//     <div>
//       <Script
//         async
//         src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services&autoload=false`}
//       />

//       <div className="relative">
//         <div ref={container} style={{ width: "1082px", height: "560px" }}></div>

//         {Object.keys(searchErrors).length > 0 && (
//           <p className="caption-r text-red mt-[15px] text-center">
//             일부 위치를 찾을 수 없습니다.
//           </p>
//         )}

//         <p className="caption-r text-gray-40 mt-[15px] text-right">
//           표시된 위치는 실제 위치와 다를 수 있습니다.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Map;
