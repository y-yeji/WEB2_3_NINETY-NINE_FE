import { useRef, useState, useEffect, useCallback } from "react";

export const useKakaoMap = (center: { lat: number; lng: number }) => {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [mapSize, setMapSize] = useState({ width: 1082, height: 560 });
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    const updateMapSize = () => {
      const width = window.innerWidth;
      let mapWidth = Math.max(320, Math.min(width - 40, 1082));
      let mapHeight = Math.round(mapWidth * 0.52);
      setMapSize({ width: mapWidth, height: mapHeight });
    };

    updateMapSize();
    window.addEventListener("resize", updateMapSize);
    return () => window.removeEventListener("resize", updateMapSize);
  }, []);

  // 1) SDK 로드 완료 시 호출
  const initMap = useCallback(() => {
    if (!window.kakao || !container.current) return;
    window.kakao.maps.load(() => {
      mapRef.current = new window.kakao.maps.Map(container.current!, {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level: 10,
      });
      setIsMapReady(true);
    });
  }, [center]);

  // 2) 지도의 크기 변경 처리
  useEffect(() => {
    if (!container.current || !mapRef.current) return;
    container.current.style.width = `${mapSize.width}px`;
    container.current.style.height = `${mapSize.height}px`;
    mapRef.current.relayout();
  }, [mapSize]);

  return { container, mapRef, initMap, mapSize, isMapReady };
};
