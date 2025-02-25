import { NavLink } from "react-router-dom";
import Icon from "../../assets/icons/Icon";

const notifications = [
  {
    id: 1,
    title: "미쉘 들라크루아",
    date: "25.02.15",
    message: "미쉘 들라크루아 특별전이 곧 종료됩니다.",
    isNew: true,
    isRead: false,
    type: "event",
  },
  {
    id: 2,
    title: "포스트 알림",
    date: "25.02.15",
    message: "님이 회원님의 글을 좋아합니다.",
    isNew: false,
    isRead: false,
    type: "post",
    userId: "Hello",
  },
  {
    id: 3,
    title: "미쉘 들라크루아",
    date: "25.02.10",
    message: "미쉘 들라크루아 특별전이 곧 종료됩니다.",
    isNew: false,
    isRead: true,
    type: "event",
  },
];

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Notification({ isOpen, onClose }: NotificationProps) {
  if (!isOpen) return null;
  return (
    <article className="fixed top-[-26px] right-[270px] z-30 w-[400px] h-[486px] mt-[84px] pt-[22px] px-[25px] bg-blue-7 border border-base-2 rounded text-blue-1 shadow-user-postcard-shadow">
      <button onClick={onClose} className="absolute top-4 right-5">
        <Icon name="X" size={20} className="text-blue-1" />
      </button>
      <section className="mb-[10px]">
        <p className="h4-b mb-2">알림</p>
        <div className="border-t border-base-2">
          <div className="flex items-center justify-between mt-[14px] px-[6px]">
            <span className="body-small-m">전체</span>
            <div className="body-small-r">
              <button className="mr-3 hover:text-base-2">모두 읽음</button>
              <button className="hover:text-base-2">전체 삭제</button>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-y-auto overflow-x-hidden">
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`w-[349px] h-[60px] px-2 py-[6px] rounded mb-[10px] ${
                notification.isNew
                  ? "bg-white"
                  : notification.isRead
                    ? "bg-base-1"
                    : "bg-base-2"
              }`}
            >
              <NavLink to={`/notification/${notification.id}`}>
                <div className={notification.isRead ? "text-gray-30" : ""}>
                  <p
                    className={`flex items-center justify-between mb-1 ${notification.isRead ? "text-gray-30" : " text-blue-1"}`}
                  >
                    <span className="body-small-m">{notification.title}</span>
                    <span className="body-small-r">{notification.date}</span>
                  </p>
                  <p
                    className={`body-small-r ${notification.isRead ? "text-gray-30" : "text-blue-5"}`}
                  >
                    {notification.type === "post" && (
                      <span>{notification.userId}</span>
                    )}
                    {notification.message}
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
