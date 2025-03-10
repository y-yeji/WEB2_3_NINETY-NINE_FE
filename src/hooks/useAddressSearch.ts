export const useAddressSearch = () => {
  // 주소 문자열 정제 함수
  const cleanAddressString = (address: string): string => {
    return address.replace(/\(.*?\)/g, "").trim();
  };

  // 주소에서 기본 주소 부분만 추출
  const extractBaseAddress = (address: string): string => {
    const roadAddressPattern = /([가-힣]+ [가-힣]+ [가-힣]+로 \d+(-\d+)?)/;
    const roadMatch = address.match(roadAddressPattern);
    if (roadMatch) return roadMatch[1];

    const generalAddressPattern = /([가-힣]+ [가-힣]+ [가-힣]+[동|읍|면])/;
    const generalMatch = address.match(generalAddressPattern);
    if (generalMatch) return generalMatch[1];

    return address;
  };

  // 장소명에서 주요 부분 추출
  const extractMainPlaceName = (placeName: string): string => {
    const mainPartPattern = /^[^(]+/;
    const mainPartMatch = placeName.match(mainPartPattern);
    if (mainPartMatch) return mainPartMatch[0].trim();
    return placeName;
  };

  // 다양한 검색 쿼리 생성
  const generateSearchQueries = (venue: string, address: string): string[] => {
    const queries: string[] = [];

    if (venue) {
      queries.push(venue);
      const cleanVenue = cleanAddressString(venue);
      if (cleanVenue !== venue) queries.push(cleanVenue);

      const mainPlaceName = extractMainPlaceName(venue);
      if (mainPlaceName !== venue && mainPlaceName !== cleanVenue) {
        queries.push(mainPlaceName);
      }
    }

    if (address) {
      queries.push(address);
      const baseAddress = extractBaseAddress(address);
      if (baseAddress !== address) queries.push(baseAddress);
    }

    if (venue && address) {
      const mainPlaceName = extractMainPlaceName(venue);
      const baseAddress = extractBaseAddress(address);
      queries.push(`${mainPlaceName} ${baseAddress}`);
    }

    return queries.filter((q) => q.length > 0);
  };

  // 주소 검색 함수
  const searchAddress = (
    searchTerm: string,
    callback: (coords: any | null) => void
  ) => {
    if (!window.kakao || !window.kakao.maps) {
      callback(null);
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    const queries = generateSearchQueries(searchTerm, searchTerm);

    const searchWithQueries = (index: number) => {
      if (index >= queries.length) {
        callback(null);
        return;
      }

      ps.keywordSearch(queries[index], (data: any, status: any) => {
        if (
          status === window.kakao.maps.services.Status.OK &&
          data.length > 0
        ) {
          const coords = new window.kakao.maps.LatLng(data[0].y, data[0].x);
          callback(coords);
        } else {
          searchWithQueries(index + 1);
        }
      });
    };

    if (queries.length > 0) {
      searchWithQueries(0);
    } else {
      callback(null);
    }
  };

  return { searchAddress, generateSearchQueries };
};
