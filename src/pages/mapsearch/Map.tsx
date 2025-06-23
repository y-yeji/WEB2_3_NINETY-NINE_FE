import Script from "./Script";
import { MapPost } from "../../types/mapSearch";
import { useKakaoMap } from "../../hooks/useKakaoMap";
import { useMapMarkers } from "../../hooks/useMapMarkers";

const KAKAO_APP_KEY = import.meta.env.VITE_APP_KAKAOMAP_KEY;

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}
interface MapProps {
  center: { lat: number; lng: number };
  posts?: MapPost[];
}

const Map = ({ center, posts }: MapProps) => {
  const { container, initMap, mapRef, mapSize, isMapReady } =
    useKakaoMap(center);
  const { searchErrors } = useMapMarkers(mapRef, posts, isMapReady);

  return (
    <div>
      <Script
        async
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services&autoload=false`}
        onLoad={initMap}
      />
      <div className="flex flex-col items-center justify-center w-full">
        <div
          ref={container}
          style={{
            width: `${mapSize.width}px`,
            height: `${mapSize.height}px`,
          }}
        ></div>
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
