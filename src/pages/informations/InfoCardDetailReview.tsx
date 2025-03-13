import { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
import { useModalStore } from "../../stores/modalStore";
import { useNavigate, useParams } from "react-router-dom";
import ReviewForm from "../../components/informationdetailreview/ReviewForm";
import ReviewList from "../../components/informationdetailreview/ReviewList";
import { Review } from "../../types/review";
import api from "../../api/api";

interface ApiReview {
  id: number;
  exhibitId: number | null;
  festivalId: number | null;
  performanceId: number | null;
  popupStoreId: number | null;
  userId: number;
  userNickname: string;
  content: string;
  rating: number;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: ApiReview[];
  success: boolean;
}

const InfoCardDetailReview = ({
  eventId,
  onReviewCountChange,
}: {
  eventId: number;
  onReviewCountChange?: (count: number) => void;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  const { checkAuth, isLoggedIn } = useAuthStore();
  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();

  // 현재 카테고리에 따른 API 파라미터 키 결정
  const getCategoryIdParam = (): { key: string; id: number } => {
    const categoryMapping: { [key: string]: string } = {
      popups: "popupStoreId",
      exhibition: "exhibitId",
      musical: "performanceId",
      festival: "festivalId",
    };

    const paramKey = categoryMapping[category || ""] || "";
    return { key: paramKey, id: eventId };
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. 사용자 정보 확인
        await checkAuth();
        let userId = "";
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          const parsed = JSON.parse(userInfo);
          userId = parsed.id?.toString() || "";
          setCurrentUserId(userId);
        }

        // 2. 리뷰 정보 가져오기
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("인증 토큰이 없습니다.");
          setLoading(false);
          return;
        }

        const { key, id } = getCategoryIdParam();

        if (!key || !id) {
          setError(
            "페이지를 불러오는 데 문제가 발생했습니다. 다시 시도해주세요."
          );
          setLoading(false);
          return;
        }

        const requestUrl = `/api/reviews?${key}=${id}`;

        const response = await api.get<ApiResponse>(requestUrl, {
          headers: {
            Authorization: token,
          },
        });

        if (response.data && response.data.success) {
          const formattedReviews = response.data.data.map((apiReview) => {
            const createdDate = new Date(apiReview.createdAt);
            const formattedDate = `${createdDate.getFullYear()}.${String(
              createdDate.getMonth() + 1
            ).padStart(2, "0")}.${String(createdDate.getDate()).padStart(
              2,
              "0"
            )}`;

            return {
              id: apiReview.id,
              userId: String(apiReview.userId),
              username: apiReview.userNickname,
              date: formattedDate,
              rating: apiReview.rating,
              content: apiReview.content,
              image:
                apiReview.imageUrls && apiReview.imageUrls.length > 0
                  ? apiReview.imageUrls[0]
                  : undefined,
              isMyReview: String(apiReview.userId) === userId, // 여기서 직접 userId 사용
            };
          });

          setReviews(formattedReviews);
          setTotalItems(formattedReviews.length);

          // 부모 컴포넌트에 리뷰 개수 전달
          if (onReviewCountChange) {
            onReviewCountChange(formattedReviews.length);
          }
        } else {
          setError(response.data.message || "리뷰를 불러오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        console.log("오류 객체 전체:", JSON.stringify(err, null, 2));
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchData();
    }
  }, [category, eventId, checkAuth, onReviewCountChange]); // currentUserId 제거, checkAuth 추가

  const handleReviewSubmit = async (
    rating: number,
    content: string,
    imageFile?: File // 이미지 파일 받기
  ) => {
    await checkAuth();
    if (!isLoggedIn) {
      openModal(
        "로그인이 필요한 서비스입니다.\n 로그인 하러 가시겠어요?",
        "취소하기",
        "로그인하기",
        () => navigate("/login")
      );
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        openModal(
          "로그인이 필요한 서비스입니다.\n 로그인 하러 가시겠어요?",
          "취소하기",
          "로그인하기",
          () => navigate("/login")
        );
        return;
      }

      const { key, id } = getCategoryIdParam();
      if (!key || !id) {
        setError("유효하지 않은 카테고리입니다.");
        return;
      }

      // FormData 객체 생성
      const formData = new FormData();

      // requestDTO 객체 생성 (문자열이 아닌 객체로 직접 전달)
      const requestDTO = {
        [key]: id,
        rating: rating,
        content: content,
      };

      // FormData에 requestDTO를 문자열로 추가
      formData.append("requestDTO", JSON.stringify(requestDTO));

      // 이미지 파일이 있으면 추가
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // API 요청 헤더 설정
      const response = await api.post("/api/reviews", formData, {
        headers: {
          Authorization: token,
          // Content-Type은 FormData를 사용할 때 자동으로 multipart/form-data로 설정됨
        },
      });

      if (response.data.success) {
        // 리뷰 등록 성공 후 리뷰 목록 다시 불러오기
        const { key, id } = getCategoryIdParam();
        const reviewsResponse = await api.get<ApiResponse>(
          `/api/reviews?${key}=${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (reviewsResponse.data && reviewsResponse.data.success) {
          const formattedReviews = reviewsResponse.data.data.map(
            (apiReview) => {
              const createdDate = new Date(apiReview.createdAt);
              const formattedDate = `${createdDate.getFullYear()}.${String(
                createdDate.getMonth() + 1
              ).padStart(2, "0")}.${String(createdDate.getDate()).padStart(
                2,
                "0"
              )}`;

              return {
                id: apiReview.id,
                userId: String(apiReview.userId),
                username: apiReview.userNickname,
                date: formattedDate,
                rating: apiReview.rating,
                content: apiReview.content,
                image:
                  apiReview.imageUrls && apiReview.imageUrls.length > 0
                    ? apiReview.imageUrls[0]
                    : undefined,
                isMyReview: String(apiReview.userId) === currentUserId,
              };
            }
          );

          setReviews(formattedReviews);
          setTotalItems(formattedReviews.length);
          if (onReviewCountChange) {
            onReviewCountChange(formattedReviews.length);
          }
        }
      }
    } catch (err) {
      console.error("리뷰 등록 오류:", err);
      openModal(
        "리뷰 등록에 실패했습니다. 다시 시도해주세요.",
        "확인",
        "",
        () => {}
      );
    }
  };

  // 리뷰 삭제 처리
  const handleDeleteReview = async (reviewId: number) => {
    // 로그인 체크
    await checkAuth();
    if (!isLoggedIn) {
      openModal(
        "로그인이 필요한 서비스입니다.\n 로그인 하러 가시겠어요?",
        "취소하기",
        "로그인하기",
        () => navigate("/login")
      );
      return;
    }

    openModal("리뷰를 삭제하시겠습니까?", "취소", "삭제", async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("인증 토큰이 없습니다.");
        }

        const response = await api.delete(`/api/reviews/${reviewId}`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.success) {
          // 리뷰 목록에서 삭제된 리뷰 제거 (API 재호출 대신 상태 업데이트)
          setReviews((prevReviews) =>
            prevReviews.filter((review) => review.id !== reviewId)
          );
          setTotalItems((prevTotal) => {
            const newTotal = prevTotal - 1;
            if (onReviewCountChange) {
              onReviewCountChange(newTotal);
            }
            return newTotal;
          });
        }
      } catch (err) {
        console.error("리뷰 삭제 오류:", err);
        openModal(
          "리뷰 삭제에 실패했습니다. 다시 시도해주세요.",
          "확인",
          "",
          () => {}
        );
      }
    });
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

      {loading ? (
        <div className="w-full text-center py-10">로딩 중...</div>
      ) : error ? (
        <div className="w-full text-center py-10 text-red-500">{error}</div>
      ) : (
        <ReviewList
          reviews={reviews}
          totalItems={totalItems}
          currentUserId={currentUserId}
          onDeleteReview={handleDeleteReview}
        />
      )}
    </div>
  );
};

export default InfoCardDetailReview;
