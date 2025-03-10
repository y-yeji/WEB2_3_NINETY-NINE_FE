import { useEffect, useRef } from "react";

const KAKAO_APP_KEY = import.meta.env.VITE_APP_KAKAOMAP_KEY;

export const useKakaoMap = (center: { lat: number; lng: number }) => {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          if (container.current) {
            const mapOptions = {
              center: new window.kakao.maps.LatLng(center.lat, center.lng),
              level: 10,
            };
            mapRef.current = new window.kakao.maps.Map(
              container.current,
              mapOptions
            );
          }
        });
      }
    };

    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services&autoload=false`;
      script.async = true;
      script.onload = loadKakaoMap;
      document.head.appendChild(script);
    } else {
      loadKakaoMap();
    }

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      mapRef.current = null;
    };
  }, [center]);

  return { container, mapRef, markersRef };
};
