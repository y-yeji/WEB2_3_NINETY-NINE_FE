import { useEffect, useState } from "react";

export function useRealTimeDate() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60초 = 1분

    return () => clearInterval(intervalId);
  }, []);

  return { currentTime };
}
