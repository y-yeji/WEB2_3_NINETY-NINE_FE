import { forwardRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import api from "../../api/api";
import { useAuthStore } from "../../stores/authStore";
import useWebSocket from "../../hooks/useWebSocket";
import { formatNotificationTime } from "../../utils/formatNotificationTime";
interface NotificationItem {
  notiId: number;
  userId: number;
  senderId: number;
  type: string;
  content: string;
  relatedId: number;
  relatedType: string;
  isRead: boolean;
  createdAt: string;
  success: boolean;
}
interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  ({ isOpen, onClose }, ref) => {
    const [notificationList, setNotificationList] = useState<
      NotificationItem[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthStore();
    const token = localStorage.getItem("accessToken");

    const fetchNotificationList = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        const response = await api.get(`api/notifications`, {
          headers: {
            Authorization: token,
          },
        });
        console.log("알림 API 응답:", response.data);
        if (response.data && response.data.data) {
          setNotificationList(response.data.data);
        }
      } catch (error) {
        console.error("알림을 가져오는데 오류가 생겼습니다.", error);
      }
    };

    const handleNewNotification = (message: string) => {
      try {
        const newNotification = JSON.parse(message) as NotificationItem;
        setNotificationList((prev) => [newNotification, ...prev]);
      } catch (error) {
        console.error("알림 메시지 파싱 오류:", error);
      }
    };

    //특정 알림 읽기
    const handleReadNotification = async (notiId: number) => {
      if (!token) return;
      setIsLoading(true);
      try {
        const response = await api.patch(
          `/api/notifications/${notiId}/status`,
          { isRead: true },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.status === 200) {
          console.log("알림 읽음 처리 성공:", response.data);

          // 기존 목록에서 해당 알림의 isRead 속성만 업데이트
          setNotificationList((prevList) =>
            prevList.map((notification) =>
              notification.notiId === notiId
                ? { ...notification, isRead: true }
                : notification
            )
          );
        }
      } catch (error) {
        console.error("알림을 알림을 읽지못했습니다.", error);
      }
    };

    // 모든 알림읽기
    const handleReadAllNotification = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        const response = await api.patch(
          `/api/notifications/all/status`,
          {}, // PATCH 요청 본문이 없으면 빈 객체 전달
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.status === 200) {
          console.log("모든 알림 읽음 처리 성공:", response.data);

          // 모든 알림을 읽음 처리
          setNotificationList((prevList) =>
            prevList.map((notification) => ({ ...notification, isRead: true }))
          );
        }
      } catch (error) {
        console.error("모든 알림을 읽지 못했습니다.", error);
      }
    };

    const handleDeleteAllNotification = async (notiId: number) => {
      if (!token) return;
      setIsLoading(true);
      try {
        const response = await api.delete(`/api/notifications/${notiId}`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.status === 200) {
          console.log("특정 알림 삭제 성공:", response.data);

          // 클라이언트 상태에서 해당 알림 제거
          setNotificationList((prevList) =>
            prevList.filter((notification) => notification.notiId !== notiId)
          );
        }
      } catch (error) {
        console.error("특정 알림을 삭제하지 못했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const WEBSOCKET_URL = `${import.meta.env.VITE_WEBSOCKET_URL}/ws`;
    const { connect, disconnect } = useWebSocket(
      WEBSOCKET_URL,
      token || "",
      user?.id || 0,
      handleNewNotification
    );

    // 컴포넌트 마운트 시 WebSocket 연결 및 알림 목록 가져오기
    useEffect(() => {
      fetchNotificationList();
      connect();

      return () => {
        disconnect();
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <article
        ref={ref}
        className="absolute top-[-25px] right-[360px] z-30 w-[400px] h-[486px] mt-[84px] pt-[22px] px-[25px] bg-blue-7 border border-base-2 rounded text-blue-1 shadow-user-postcard-shadow"
      >
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-5">
          <Icon name="X" size={20} className="text-blue-1" />
        </button>

        {/* 알림 헤더 */}
        <section className="mb-[10px]">
          <p className="h4-b mb-2">알림</p>
          <div className="border-t border-base-2">
            <div className="flex items-center justify-between mt-[14px] px-[6px]">
              <span className="body-small-m">전체</span>
              <div className="body-small-r">
                <button
                  className="mr-3 hover:text-base-2"
                  onClick={() => handleReadAllNotification}
                >
                  모두 읽음
                </button>
                <button
                  className="hover:text-base-2"
                  onClick={() => handleDeleteAllNotification}
                >
                  전체 삭제
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 알림 리스트 */}
        <section className="overflow-y-auto overflow-x-hidden">
          {isLoading && (
            <p className="text-center text-gray-40">
              알림 목록을 로딩 중 입니다.
            </p>
          )}
          <ul>
            {notificationList.map((notification: NotificationItem, index) => (
              <li
                key={notification.notiId}
                className={`w-[349px] h-[60px] px-[10px] py-2 rounded mb-[10px] ${
                  index === 0 && !notification.isRead
                    ? "bg-white"
                    : notification.isRead
                      ? "bg-base-1"
                      : "bg-base-2"
                }`}
                onClick={() => handleReadNotification(notification.notiId)}
              >
                <NavLink to={`/notification/${notification.relatedId}`}>
                  <div className={notification.isRead ? "text-gray-30" : ""}>
                    {/* 제목과 날짜 */}
                    <p
                      className={`flex items-center justify-between mb-1 ${
                        notification.isRead ? "text-gray-30" : "text-blue-1"
                      }`}
                    >
                      <span className="body-small-m">{notification.type}</span>
                      <span className="body-small-r">
                        {formatNotificationTime(notification.createdAt)}
                      </span>
                    </p>

                    {/* 메시지 */}
                    <p
                      className={`body-small-r ${
                        notification.isRead ? "text-gray-30" : "text-blue-5"
                      }`}
                    >
                      {notification.type === "post" && (
                        <span>{notification.userId}</span>
                      )}
                      {notification.content}
                    </p>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </article>
    );
  }
);

export default Notification;
