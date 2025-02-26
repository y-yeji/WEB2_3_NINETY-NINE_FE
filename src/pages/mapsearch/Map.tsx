import { useRef } from "react";
import Script from "./Script";

const KAKAO_APP_KEY = import.meta.env.VITE_APP_KAKAOMAP_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const container = useRef(null);
  const init = () => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 1,
      };
      const map = new window.kakao.maps.Map(container.current, options);
    });
  };

  return (
    <div>
      <Script
        async
        onLoad={init}
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`}
      />
      <div ref={container} style={{ width: "1082px", height: "560px" }}></div>
    </div>
  );
};

export default Map;
