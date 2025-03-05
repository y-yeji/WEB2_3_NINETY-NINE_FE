import { useEffect, useRef } from "react";

const KAKAO_APP_KEY = import.meta.env.VITE_APP_KAKAOMAP_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}

const dummyLocation = { lat: 37.5665, lng: 126.978 }; // 서울 시청의 위도와 경도

const InfoCardDetailInfoMap = () => {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          if (container.current) {
            const mapOptions = {
              center: new window.kakao.maps.LatLng(
                dummyLocation.lat,
                dummyLocation.lng
              ),
              level: 3,
            };
            mapRef.current = new window.kakao.maps.Map(
              container.current,
              mapOptions
            );

            const markerPosition = new window.kakao.maps.LatLng(
              dummyLocation.lat,
              dummyLocation.lng
            );
            const markerImage = new window.kakao.maps.MarkerImage(
              "/location-marker.png", // 마커 이미지 경로
              new window.kakao.maps.Size(50, 50), // 마커 이미지 크기
              { offset: new window.kakao.maps.Point(25, 50) } // 마커 이미지의 기준 좌표
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              image: markerImage,
              map: mapRef.current,
            });
          }
        });
      }
    };

    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
      script.async = true;
      script.onload = loadKakaoMap;
      document.head.appendChild(script);
    } else {
      loadKakaoMap();
    }

    return () => {
      mapRef.current = null;
    };
  }, []);

  return (
    <div ref={container} style={{ width: "1080px", height: "560px" }}></div>
  );
};

export default InfoCardDetailInfoMap;
