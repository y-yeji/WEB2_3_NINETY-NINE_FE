import { useState } from "react";
import ShortButton from "../../components/ui/ShortButton";
import StarRating from "../../components/informationdetailreview/StarRating";
import { useAuthStore } from "../../stores/authStore";

interface ReviewFormProps {
  onSubmit?: (rating: number, content: string) => void;
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [reviewContent, setReviewContent] = useState<string>("");
  const { accessToken } = useAuthStore();

  const handleReviewSubmit = () => {
    if (!accessToken) {
      alert("로그인 후 이용해주세요");
      return;
    }
    // 후기 등록 로직 추가
    console.log("후기 등록:", selectedRating, reviewContent);
    if (onSubmit) {
      onSubmit(selectedRating, reviewContent);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0">
      <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2 px-6">
        <div className="flex-grow-0 flex-shrink-0 w-[30px] h-6">
          <p className="absolute left-6 top-0 body-normal-r text-center text-gray-80">
            별점
          </p>
        </div>
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1.5">
          <StarRating rating={selectedRating} onChange={setSelectedRating} />
        </div>
      </div>
      <div className="flex flex-col justify-start items-end self-stretch flex-grow-0 flex-shrink-0">
        <div className="mt-5">
          <textarea
            className="w-[1120px] h-[200px] p-6 border border-blue-7 focus:border-blue-1 rounded-[10px]"
            placeholder="관람 후기를 작성해주세요."
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />
        </div>
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-5 mt-7">
          <ShortButton
            text="이미지 선택"
            bgColor="base-1"
            textColor="blue-1"
            hoverColor="blue-2"
            onClick={() => console.log("이미지 선택 버튼 클릭")}
          />
          <ShortButton
            text="후기 등록"
            bgColor="blue-1"
            textColor="base-1"
            hoverColor="blue-2"
            onClick={handleReviewSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
