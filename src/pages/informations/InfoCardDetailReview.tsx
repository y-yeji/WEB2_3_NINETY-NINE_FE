import { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import ReviewForm from "../../components/informationdetailreview/ReviewForm";
import ReviewList from "../../components/informationdetailreview/ReviewList";
import { Review } from "../../types/review";

const InfoCardDetailReview = () => {
  const totalItems = 19;
  const { accessToken } = useAuthStore();
  const currentUserId = "user123";

  const dummyReviews: Review[] = [
    {
      id: 1,
      userId: "user123",
      username: "NINETY9",
      date: "2025.02.19",
      rating: 5,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "/default-image.png",
      isMyReview: true,
    },
    {
      id: 2,
      userId: "user456",
      username: "NINETY10",
      date: "2025.02.19",
      rating: 5,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      isMyReview: false,
    },
    {
      id: 3,
      userId: "user789",
      username: "NINETY11",
      date: "2025.02.15",
      rating: 4,
      content: "정말 좋은 전시회였습니다. 다음에도 또 방문하고 싶어요.",
      image: "/default-image.png",
      isMyReview: false,
    },
    {
      id: 4,
      userId: "user123",
      username: "NINETY12",
      date: "2025.02.10",
      rating: 3,
      content: "전반적으로 괜찮았지만 조금 아쉬운 점도 있었습니다.",
      isMyReview: true,
    },
  ];

  const handleReviewSubmit = (rating: number, content: string) => {
    console.log("메인 컴포넌트에서 후기 등록:", rating, content);
  };

  const handleDeleteReview = (reviewId: number) => {
    console.log("리뷰 삭제:", reviewId);
  };

  return (
    <div className="flex flex-col justify-start items-start w-[1120px] gap-5 mt-10">
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative ml-10">
          <p className="flex-grow-0 flex-shrink-0 h4-b font-bold text-center text-gray-80">
            후기 작성
          </p>
        </div>
        <div className="w-full border-t border-blue-7 mt-4"></div>
      </div>

      <ReviewForm onSubmit={handleReviewSubmit} />

      <ReviewList
        reviews={dummyReviews}
        totalItems={totalItems}
        currentUserId={currentUserId}
        onDeleteReview={handleDeleteReview}
      />
    </div>
  );
};

export default InfoCardDetailReview;
