const NotificationHeader = ({
  onMarkAllAsRead,
  onDeleteAllNotifications,
}: {
  onMarkAllAsRead: () => void;
  onDeleteAllNotifications: () => void;
}) => (
  <section className="mb-[10px]">
    <p className="h4-b mb-[10px]">알림</p>
    <div className="border-t border-base-2">
      <div className="flex items-center justify-between mt-[14px] px-[6px]">
        <span className="body-small-m">전체</span>
        <div className="body-small-r">
          <button className="mr-3 hover:text-base-2" onClick={onMarkAllAsRead}>
            모두 읽음
          </button>
          <button
            className="hover:text-base-2"
            onClick={onDeleteAllNotifications}
          >
            전체 삭제
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default NotificationHeader;
