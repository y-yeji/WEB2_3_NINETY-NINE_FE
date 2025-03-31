import { useState, useEffect, useRef } from "react";
import { useWebSocketNotification } from "../../hooks/useWebSocketNotification";
import api from "../../api/api";
import Icon from "../../assets/icons/Icon";
import Notification from "./notification";
import { useAuthStore } from "../../stores/authStore";

interface Notification {
  notiId: number;
  userId: number;
  senderId: number;
  type: string;
  content: string;
  relatedId: number;
  relatedType: string;
  read: boolean;
  createdAt: string;
}

interface ApiResponse {
  data: Notification[];
  success: boolean;
}

interface NotificationManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({
  isOpen,
  onClose,
  onToggle,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuthStore();
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Access token is missing");
    return null;
  }

  const userId = user.userId;

  const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

  const hasUnreadNotification = notifications.some((n) => !n.read);

  // WebSocket 핸들러
  const handleNewNotification = (message: string) => {
    const newNotification = JSON.parse(message);
    setNotifications((prev) => [{ ...newNotification, read: false }, ...prev]);
  };

  useWebSocketNotification(WEBSOCKET_URL, token, userId, handleNewNotification);

  // 초기 알림 데이터 가져오기
  useEffect(() => {
    const fetchInitialNotifications = async () => {
      try {
        const response = await api.get<ApiResponse>(`/api/notifications`, {
          headers: { Authorization: token },
        });

        setNotifications(response.data.data);
      } catch (error) {
        console.error("알림 데이터 가져오기 실패:", error);
      }
    };

    fetchInitialNotifications();
  }, [token]);

  // 모든 알림 읽음 처리
  const markNotificationsAsRead = async () => {
    try {
      await api.patch(
        `/api/notifications/all/status`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error("모두 읽음 실패", error);
    }
  };

  // 특정 알림 읽음 처리
  const markSingleNotificationAsRead = async (notiId: number) => {
    try {
      await api.patch(
        `/api/notifications/${notiId}/status`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.notiId === notiId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("읽음 실패", error);
    }
  };

  // 전체 알림 삭제
  const deleteAllNotifications = async () => {
    try {
      await api.delete(`/api/notifications`, {
        headers: { Authorization: token },
      });
      setNotifications([]);
    } catch (error) {
      console.error("전체 삭제 실패:", error);
    }
  };

  return (
    <div className="relative">
      {/* 알림 버튼 */}
      <button onClick={onToggle} aria-label="알림 열기">
        <span className="relative">
          {hasUnreadNotification ? (
            <>
              <span className="flex justify-center items-center w-10 h-10 bg-base-2 rounded-full">
                <Icon name="Bell" size={24} className="text-blue-1" />
              </span>
              <span className="absolute top-[5px] right-[9px] h-[6px] w-[6px] bg-red-error rounded-full"></span>
            </>
          ) : (
            <span className="flex justify-center items-center w-10 h-10 rounded-full">
              <Icon name="Bell" size={24} className="text-blue-1" />
            </span>
          )}
        </span>
      </button>

      {/* 알림창 */}
      <Notification
        ref={notificationRef}
        isOpen={isOpen}
        onClose={onClose}
        notificationList={notifications}
        onRead={markSingleNotificationAsRead}
        onMarkAllAsRead={markNotificationsAsRead}
        onDeleteAllNotifications={deleteAllNotifications}
      />
    </div>
  );
};

export default NotificationManager;
