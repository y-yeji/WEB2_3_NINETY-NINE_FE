import { useEffect } from "react";
import useWebSocket from "./useWebSocket";

export const useWebSocketNotification = (
  WEBSOCKET_URL: string,
  token: string,
  userId: number,
  handleNewNotification: (message: string) => void
) => {
  const { connect, disconnect } = useWebSocket(
    WEBSOCKET_URL,
    token,
    userId,
    handleNewNotification
  );

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);
};
