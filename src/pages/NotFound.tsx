import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-[calc(100vh-84px)] text-center">
      <h2 className="text-6xl font-bold text-gray-800">Page Not Found</h2>
      <p className="text-body-n-r text-gray-80 mt-2">
        요청하신 페이지를 찾을 수 없어요.
      </p>
      <Link
        to="/"
        className="px-6 py-4 text-lg text-gray-80 bg-blue-7 rounded-[8px]  hover:text-base-1 hover:bg-blue-4 transition"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
