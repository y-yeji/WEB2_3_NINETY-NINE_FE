import { useEffect, useRef, useState } from "react";

const KAKAO_APP_KEY = import.meta.env.VITE_APP_KAKAOMAP_KEY;

export const useKakaoMap = (center: { lat: number; lng: number }) => {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapSize, setMapSize] = useState({ width: 1082, height: 560 });

  useEffect(() => {
    // 화면 크기에 따라 지도 크기 조정
    // const updateMapSize = () => {
    //   const width = window.innerWidth;
    //   if (width >= 1280) {
    //     setMapSize({ width: 1082, height: 560 });
    //   } else if (width >= 768) {
    //     setMapSize({ width: 768, height: 560 });
    //   } else {
    //     // 좌우 padding 16px씩 고려, 가로 비율에 맞춰 높이 조정
    //     setMapSize({
    //       width: width - 40,
    //       height: Math.round((width - 32) * 0.52),
    //     });
    //   }
    // };
    // updateMapSize();
    // window.addEventListener("resize", updateMapSize);
    // return () => window.removeEventListener("resize", updateMapSize);

    const updateMapSize = () => {
      const width = window.innerWidth;
      // 원하는 최소/최대값을 설정해도 됨
      let mapWidth = Math.max(320, Math.min(width - 40, 1082)); // 최소 320, 최대 1082
      let mapHeight = Math.round(mapWidth * 0.52); // 비율 유지 (원하는 비율로)
      setMapSize({ width: mapWidth, height: mapHeight });
    };

    updateMapSize();
    window.addEventListener("resize", updateMapSize);
    return () => window.removeEventListener("resize", updateMapSize);
  }, []);

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

  // mapSize가 바뀔 때마다 지도 div와 지도 객체에 반영
  useEffect(() => {
    if (container.current) {
      container.current.style.width = `${mapSize.width}px`;
      container.current.style.height = `${mapSize.height}px`;
    }
    if (mapRef.current) {
      mapRef.current.relayout();
    }
  }, [mapSize]);

  return { container, mapRef, markersRef };
};
