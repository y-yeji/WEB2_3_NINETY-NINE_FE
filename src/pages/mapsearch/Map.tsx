import { useEffect, useRef, useState } from "react";
import Script from "./Script";
import { useLocation } from "../../hooks/useLocation";

const KAKAO_APP_KEY = import.meta.env.VITE_APP_KAKAOMAP_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}
interface MapProps {
  center: { lat: number; lng: number };
}

const Map = ({ center }: MapProps) => {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const location = useLocation();
  const [currentCenter, setCurrentCenter] = useState(center);

  useEffect(() => {
    if (location) {
      setCurrentCenter(location);
    }
  }, [location]);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          if (container.current) {
            const mapOptions = {
              center: new window.kakao.maps.LatLng(
                currentCenter.lat,
                currentCenter.lng
              ),
              level: 3,
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
  }, [currentCenter]);

  useEffect(() => {
    if (mapRef.current && currentCenter && location) {
      const markerPosition = new window.kakao.maps.LatLng(
        location.lat,
        location.lng
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: mapRef.current,
      });

      const markerImage = new window.kakao.maps.MarkerImage(
        "./location-marker.png",
        new window.kakao.maps.Size(50, 50),
        { offset: new window.kakao.maps.Point(27, 69) }
      );
      marker.setImage(markerImage);
    }
  }, [mapRef.current, location, currentCenter]);

  const handleReLocate = () => {
    console.log("위치:", location);
    if (location && mapRef.current) {
      const newCenter = new window.kakao.maps.LatLng(
        location.lat,
        location.lng
      );
      mapRef.current.setCenter(newCenter);
    }
  };

  return (
    <div>
      <Script
        async
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`}
      />
      <div className="relative">
        <div ref={container} style={{ width: "1082px", height: "560px" }}></div>
        <button
          className="absolute top-[502px] left-[10px] z-10 w-20 h-7 body-small-r text-base-1 bg-blue-7 rounded-full "
          onClick={handleReLocate}
        >
          내 위치로
        </button>
      </div>
    </div>
  );
};

export default Map;
