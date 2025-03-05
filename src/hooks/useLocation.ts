import { useEffect, useState } from "react";

interface Location {
  lat: number;
  lng: number;
}

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    function success(position: GeolocationPosition) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }
    function error() {
      setLocation({
        lat: 37.483034,
        lng: 126.902435,
      });
      console.log("위치 받기 실패");
    }
  }, []);
  return location;
};
