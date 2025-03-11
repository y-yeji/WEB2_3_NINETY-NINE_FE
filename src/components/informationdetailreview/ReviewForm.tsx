import { useState, useRef } from "react";
import ShortButton from "../../components/ui/ShortButton";
import StarRating from "../../components/informationdetailreview/StarRating";
import { useAuthStore } from "../../stores/authStore";
import Icon from "../../assets/icons/Icon";
import { useModalStore } from "../../stores/modalStore";
import { useNavigate } from "react-router-dom";

interface ReviewFormProps {
  onSubmit?: (rating: number, content: string, imageFile?: File) => void;
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [reviewContent, setReviewContent] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const { isLoggedIn } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  // 이미지 선택 처리
  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  // 이미지 파일 변경 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert("이미지 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 이미지 타입 체크
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    setSelectedImage(file);

    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 이미지 취소 처리
  const handleCancelImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 후기 등록 처리
  const handleReviewSubmit = async () => {
    if (!isLoggedIn) {
      openModal(
        "로그인이 필요한 서비스입니다.\n 로그인 하러 가시겠어요?",
        "취소하기",
        "로그인하기",
        () => navigate("/login")
      );
      return;
    }

    if (selectedRating === 0) {
      openModal("별점을 선택해주세요.", "", "닫기");
      return;
    }

    if (!reviewContent.trim()) {
      openModal("후기 내용을 입력해주세요.", "", "닫기");
      return;
    }

    try {
      setUploading(true);

      if (onSubmit) {
        onSubmit(selectedRating, reviewContent, selectedImage || undefined);
      }

      setSelectedRating(0);
      setReviewContent("");
      setSelectedImage(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("후기 등록 중 오류:", err);
      alert("후기 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setUploading(false);
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
        <div className="mt-5 flex flex-row w-full">
          {/* 이미지가 선택되었을 때 이미지 표시 */}
          {previewUrl && (
            <div className="relative mr-4">
              <div className="w-[200px] h-[200px] rounded-lg overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                className="absolute top-2 right-2 bg-gray-600 bg-opacity-70 rounded-full p-1"
                onClick={handleCancelImage}
              >
                <Icon name="X" className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

          {/* textarea의 너비를 이미지 유무에 따라 조정 */}
          <textarea
            className={`h-[200px] p-6 border border-blue-7 focus:border-blue-1 rounded-[10px] ${
              previewUrl ? "w-[calc(1120px-224px)]" : "w-[1120px]"
            }`}
            placeholder="관람 후기를 작성해주세요."
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />
        </div>

        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-5 mt-7">
          {/* 숨겨진 파일 입력 */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <ShortButton
            text="이미지 선택"
            bgColor="base-1"
            textColor="blue-1"
            hoverColor="blue-2"
            onClick={handleImageSelect}
          />
          <ShortButton
            text={uploading ? "등록 중" : "후기 등록"}
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
