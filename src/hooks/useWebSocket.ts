import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

interface WebSocketHook {
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
}

const useWebSocket = (
  url: string,
  token: string,
  userId: number,
  onMessage: (message: string) => void
): WebSocketHook & { isConnected: boolean } => {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const configureClient = () => {
    const socket = new SockJS(url);

    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    client.onConnect = () => {
      console.log("WebSocket에 연결되었습니다.");
      setIsConnected(true);
      // 서버에서 특정 채널 구독
      client.subscribe(`topic/notifications/${userId}`, (message) => {
        onMessage(message.body);
      });
    };

    client.onStompError = (error) => {
      console.error("STOMP Error:", error);
    };

    client.onDisconnect = () => {
      console.log("WebSocket에서 연결이 끊겼습니다.");
    };

    clientRef.current = client;
  };

  // WebSocket 연결 활성화
  const connect = () => {
    if (clientRef.current) {
      clientRef.current.activate();
    }
  };

  // WebSocket 연결 비활성화
  const disconnect = () => {
    if (clientRef.current) {
      clientRef.current.deactivate();
      setIsConnected(false);
    }
  };

  useEffect(() => {
    configureClient();

    return () => {
      disconnect();
    };
  }, [url, token, userId]);

  return { connect, disconnect, isConnected };
};

export default useWebSocket;
