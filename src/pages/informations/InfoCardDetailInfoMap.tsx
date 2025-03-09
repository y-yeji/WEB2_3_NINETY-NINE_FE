import { useEffect, useRef, useState } from "react";

interface LocationData {
  lat?: number;
  lng?: number;
  address?: string;
  venue?: string;
}

interface InfoCardDetailInfoMapProps {
  location: LocationData;
}

const KAKAO_APP_KEY = import.meta.env.VITE_APP_KAKAOMAP_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}

// 서울 시청의 위도와 경도 (기본값)
const DEFAULT_LOCATION = { lat: 37.5665, lng: 126.978 };

const InfoCardDetailInfoMap: React.FC<InfoCardDetailInfoMapProps> = ({
  location,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchSuccess, setSearchSuccess] = useState(false);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          initMap();
          processLocationSearch();
        });
      }
    };

    // 지도 초기화 함수
    const initMap = () => {
      if (!container.current) return;

      const mapOptions = {
        center: new window.kakao.maps.LatLng(
          DEFAULT_LOCATION.lat,
          DEFAULT_LOCATION.lng
        ),
        level: 3,
      };

      mapRef.current = new window.kakao.maps.Map(container.current, mapOptions);
    };

    // 주소 문자열 정제 함수
    const cleanAddressString = (address: string): string => {
      // 괄호와 그 안의 내용 제거
      return address.replace(/\(.*?\)/g, "").trim();
    };

    // 주소에서 기본 주소 부분만 추출 (상세주소 제거)
    const extractBaseAddress = (address: string): string => {
      // 도로명 주소 패턴 (예: 서울 성동구 뚝섬로 47-7)
      const roadAddressPattern = /([가-힣]+ [가-힣]+ [가-힣]+로 \d+(-\d+)?)/;
      const roadMatch = address.match(roadAddressPattern);

      if (roadMatch) return roadMatch[1];

      // 일반 주소 패턴 (시/도 구/군 동/읍/면까지만)
      const generalAddressPattern = /([가-힣]+ [가-힣]+ [가-힣]+[동|읍|면])/;
      const generalMatch = address.match(generalAddressPattern);

      if (generalMatch) return generalMatch[1];

      return address;
    };

    // 장소명에서 주요 부분 추출 (예: "상상플레이스 여순광점(여수 웅천...)" -> "상상플레이스 여순광점")
    const extractMainPlaceName = (placeName: string): string => {
      // 첫 번째 괄호 전까지의 텍스트 추출
      const mainPartPattern = /^[^(]+/;
      const mainPartMatch = placeName.match(mainPartPattern);

      if (mainPartMatch) return mainPartMatch[0].trim();

      return placeName;
    };

    // 다양한 검색 쿼리 생성
    const generateSearchQueries = (
      venue: string,
      address: string
    ): string[] => {
      const queries: string[] = [];

      if (venue) {
        // 1. 원본 venue
        queries.push(venue);

        // 2. 괄호 제거한 venue
        const cleanVenue = cleanAddressString(venue);
        if (cleanVenue !== venue) queries.push(cleanVenue);

        // 3. 주요 장소명만 추출
        const mainPlaceName = extractMainPlaceName(venue);
        if (mainPlaceName !== venue && mainPlaceName !== cleanVenue) {
          queries.push(mainPlaceName);
        }
      }

      if (address) {
        // 4. 원본 address
        queries.push(address);

        // 5. 기본 주소만 추출
        const baseAddress = extractBaseAddress(address);
        if (baseAddress !== address) queries.push(baseAddress);
      }

      // 주소와 장소명 조합 (첫 번째 장소명 + 기본 주소)
      if (venue && address) {
        const mainPlaceName = extractMainPlaceName(venue);
        const baseAddress = extractBaseAddress(address);
        queries.push(`${mainPlaceName} ${baseAddress}`);
      }

      return queries.filter((q) => q.length > 0);
    };

    // 순차적으로 검색 시도
    const searchWithQueries = (queries: string[], index = 0) => {
      if (!mapRef.current || index >= queries.length) {
        if (!searchSuccess) {
          setSearchError("모든 검색 시도가 실패했습니다.");
        }
        return;
      }

      const query = queries[index];
      console.log(`검색 시도 ${index + 1}/${queries.length}: "${query}"`);

      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(query, (data: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          // 검색 성공
          const firstResult = data[0];
          const coords = new window.kakao.maps.LatLng(
            firstResult.y,
            firstResult.x
          );

          // 지도 중심 이동
          mapRef.current.setCenter(coords);

          // 기존 마커가 있으면 제거
          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          // 새 마커 생성
          const markerImage = new window.kakao.maps.MarkerImage(
            "/location-marker.png",
            new window.kakao.maps.Size(50, 50),
            { offset: new window.kakao.maps.Point(25, 50) }
          );

          markerRef.current = new window.kakao.maps.Marker({
            position: coords,
            image: markerImage,
            map: mapRef.current,
          });

          // 인포윈도우에 장소명 표시
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">${firstResult.place_name}</div>`,
          });

          infowindow.open(mapRef.current, markerRef.current);

          setSearchSuccess(true);
          setSearchError(null);
        } else {
          // 다음 쿼리로 검색 시도
          searchWithQueries(queries, index + 1);
        }
      });
    };

    // 검색 프로세스 실행
    const processLocationSearch = () => {
      setSearchSuccess(false);
      setSearchError(null);

      const venueStr = location.venue || "";
      const addressStr = location.address || "";

      if (!venueStr && !addressStr) {
        setSearchError("검색할 주소나 장소명이 없습니다.");
        return;
      }

      const searchQueries = generateSearchQueries(venueStr, addressStr);
      console.log("생성된 검색 쿼리:", searchQueries);

      if (searchQueries.length > 0) {
        searchWithQueries(searchQueries);
      } else {
        setSearchError("유효한 검색 쿼리를 생성할 수 없습니다.");
      }
    };

    // 카카오맵 스크립트 로드
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
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      mapRef.current = null;
    };
  }, [location]); // location이 변경될 때마다 실행

  return (
    <div className="w-full">
      <div
        ref={container}
        className="w-full h-[500px] rounded-lg shadow-md"
      ></div>
      {searchError && (
        <p className="text-red-500 mt-2 text-center text-sm">{searchError}</p>
      )}
      <p className="text-xs text-gray-500 mt-2 text-center">
        * 표시된 위치는 실제 위치와 다를 수 있습니다.
      </p>
    </div>
  );
};

export default InfoCardDetailInfoMap;
