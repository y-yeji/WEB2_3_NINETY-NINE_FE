import { useState } from "react";
import Icon from "../../assets/icons/Icon";
import Pagination from "../../components/ui/Pagination";
import ShortButton from "../../components/ui/ShortButton";

interface Review {
  id: number;
  userId: string;
  username: string;
  date: string;
  rating: number;
  content: string;
  image?: string;
  isMyReview: boolean;
}

const InfoCardDetailReview = () => {
  const totalItems = 19;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const currentReviews = dummyReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          className={`flex-grow-0 flex-shrink-0 w-[18px] h-[18px] ${i < rating ? "text-blue-1" : "text-blue-1"}`}
          fill={i < rating ? "currentColor" : "none"}
        />
      );
    }
    return stars;
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
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0">
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2 px-6">
          <div className="flex-grow-0 flex-shrink-0 w-[30px] h-6">
            <p className="absolute left-6 top-0 body-normal-r text-center text-gray-80">
              별점
            </p>
          </div>
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1.5">
            {renderStars(0)}
          </div>
        </div>
        <div className="flex flex-col justify-start items-end self-stretch flex-grow-0 flex-shrink-0">
          <div className="mt-5">
            <textarea
              className="w-[1120px] h-[200px] p-6 border border-blue-7 focus:border-blue-1 rounded-[10px]"
              placeholder="관람 후기를 작성해주세요."
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
              onClick={() => console.log("후기 등록 버튼 클릭")}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-5 mt-12">
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
          <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2 ml-10">
            <p className="flex-grow-0 flex-shrink-0 h4-b font-bold text-left text-gray-80">
              후기{" "}
            </p>
            <p className="flex-grow-0 flex-shrink-0 h4-b font-bold text-left text-gray-80">
              {dummyReviews.length}
            </p>
          </div>
          <div className="w-full border-t border-blue-7 mt-4"></div>
        </div>
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-[30px]">
          {currentReviews.map((review) => (
            <div
              key={review.id}
              className={`flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 ${review.image ? "h-[200px]" : "h-[142px]"} gap-2.5 pl-[38px] pr-[18px] py-7 rounded-[10px] bg-base-1 border border-blue-7`}
            >
              <div className="flex justify-end items-start flex-grow-0 flex-shrink-0 relative">
                <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[1044px] gap-5">
                  <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                    <p className="flex-grow-0 flex-shrink-0 body-normal-r text-center text-gray-80 cursor-pointer">
                      {review.username}
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 body-normal-r text-center text-gray-80">
                      |
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 body-normal-r text-center text-gray-80">
                      {review.date}
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 body-normal-r text-center text-gray-80">
                      |
                    </p>
                    <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-0.5">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-[38px]">
                    {review.image && (
                      <div
                        className="w-[100px] h-[100px] relative rounded-lg cursor-pointer"
                        style={{
                          backgroundImage: `url(${review.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="absolute top-[84px] left-[84px] w-[12px] h-[12px] rounded-full bg-base-1 flex items-center justify-center">
                          <Icon name="ZoomIn" className="w-[8px] h-[8px]" />
                        </div>
                      </div>
                    )}
                    <p
                      className={`flex-grow-0 flex-shrink-0 ${review.image ? "w-[906px]" : "w-[1044px]"} body-small-r text-left text-gray-80`}
                    >
                      {review.content}
                    </p>
                  </div>
                </div>
                {review.isMyReview && (
                  <Icon
                    name="Trash2"
                    className="flex-grow-0 flex-shrink-0 w-5 h-5 cursor-pointer relative -left-2.5"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center my-12">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default InfoCardDetailReview;
