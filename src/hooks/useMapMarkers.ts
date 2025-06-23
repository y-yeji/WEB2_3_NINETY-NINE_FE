import { useState, useEffect, useRef } from "react";
import { MapPost } from "../types/mapSearch";
import { useAddressSearch } from "./useAddressSearch";

export const useMapMarkers = (
  mapRef: React.MutableRefObject<kakao.maps.Map | null>,
  posts?: MapPost[],
  isMapReady?: boolean
) => {
  const [searchErrors, setSearchErrors] = useState<Record<number, string>>({});
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const { searchAddress } = useAddressSearch();

  // 해시태그 추출 함수
  const extractHashtags = (text: string): string[] => {
    return text.match(/#([^\s]+)/g)?.map((tag) => tag.slice(1)) || [];
  };

  // 커스텀 HTML 템플릿 생성 함수
  const createInfoWindowContent = (post: MapPost): string => {
    if (!post.description) {
      return "<div>설명 없음</div>";
    }

    const hashtags = extractHashtags(post.description);
    const hashtagText = hashtags.join(", ");

    return `
      <div style="padding:10px; body-small-r;">
        <strong>${post.description}</strong>
        <p>${hashtagText || "해시태그 없음"}</p>
      </div>
    `;
  };

  // 좌표로 마커 추가 함수
  const addMarkersWithCoords = (postsData: MapPost[]) => {
    if (!mapRef.current) return;

    postsData.forEach((post) => {
      const position = new window.kakao.maps.LatLng(
        post.latitude,
        post.longitude
      );

      const markerImage = new window.kakao.maps.MarkerImage(
        "/location-marker.png",
        new window.kakao.maps.Size(50, 50),
        { offset: new window.kakao.maps.Point(25, 50) }
      );

      const marker = new window.kakao.maps.Marker({
        position,
        image: markerImage,
        map: mapRef.current,
      });

      const content = createInfoWindowContent(post);
      const infowindow = new window.kakao.maps.InfoWindow({ content });

      window.kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(mapRef.current!, marker);
      });

      markersRef.current.push(marker);
    });
  };

  // 위치 처리 함수
  const processPostsLocations = () => {
    if (!mapRef.current || !posts) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 좌표가 있는 posts는 직접 마커 표시
    const postsWithCoords = posts.filter(
      (post) => post.latitude && post.longitude
    );
    addMarkersWithCoords(postsWithCoords);

    // venue나 location 정보만 있는 posts는 검색 후 마커 표시
    const postsWithoutCoords = posts.filter(
      (post) =>
        (!post.latitude || !post.longitude) && (post.venue || post.location)
    );

    postsWithoutCoords.forEach((post) => {
      const searchTerm = post.venue || post.location || "";
      searchAddress(searchTerm, (coords) => {
        if (coords) {
          // 마커 이미지 객체 생성
          const markerImage = new window.kakao.maps.MarkerImage(
            "/location-marker.png",
            new window.kakao.maps.Size(50, 50),
            { offset: new window.kakao.maps.Point(25, 50) }
          );

          // 검색 성공 시 마커 추가
          const marker = new window.kakao.maps.Marker({
            position: coords,
            image: markerImage,
            map: mapRef.current,
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px; font-size:12px;">${post.title}</div>`,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            infowindow.open(mapRef.current!, marker);
          });

          markersRef.current.push(marker);
        } else {
          // 검색 실패 시 오류 기록
          setSearchErrors((prev) => ({
            ...prev,
            [post.id]: "위치를 찾을 수 없습니다.",
          }));
        }
      });
    });
  };

  useEffect(() => {
    if (isMapReady && posts) {
      processPostsLocations();
    }

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [isMapReady, posts]);

  return { searchErrors, markersRef };
};
