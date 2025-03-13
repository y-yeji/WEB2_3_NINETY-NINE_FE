import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/common/ImageUploader";
import InputField from "../../components/ui/InputField";
import QuillEditor from "../../components/texteditor/QuillEditor";
import ShortButton from "../../components/ui/ShortButton";
import api from "../../api/api";
import { useModalStore } from "../../stores/modalStore";

const CommunityEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleImageUpload = (images: (File | string)[]) => {
    const validFiles = images.filter((img): img is File => img instanceof File);
    setImageFiles(validFiles);
  };

  const handleSubmit = async () => {
    const { openModal } = useModalStore.getState();

    if (!title.trim() || !content.trim()) {
      openModal("제목과 내용을 입력해주세요.", "", "닫기");
      return;
    }

    openModal("게시글을 생성하시겠습니까?", "취소", "확인", async () => {
      const formData = new FormData();
      const requestDTO = { title, content };
      formData.append("requestDTO", JSON.stringify(requestDTO));

      imageFiles.forEach((img) => {
        if (img instanceof File) {
          formData.append("images", img);
        } else {
          console.error(`잘못된 이미지 타입: ${typeof img}`, img);
        }
      });
      try {
        const token = localStorage.getItem("accessToken");
        const response = await api.post("/api/socialPosts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        });
        openModal("게시글이 생성되었습니다.", "", "확인", () => {
          navigate("/mypage");
        });
      } catch (error) {
        console.error("게시글 생성 중 오류 발생", error);
        openModal("게시글 생성 중 오류가 발생했습니다.", "", "닫기");
      }
    });
  };
  const handleCancel = () => {
    const { openModal } = useModalStore.getState();

    openModal("정말로 게시글 작성을 취소하시겠습니까?", "취소", "확인", () => {
      setTitle("");
      setContent("");
      setImageFiles([]);
      navigate("/mypage");
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <div className="mt-[100px]">
        <InputField
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          customStyle="w-[1200px] h-[50px] mt-[67px] mb-5 body-l-m border-gray-5"
        />
        <QuillEditor value={content} onChange={setContent} />

        <ImageUploader onUpload={handleImageUpload} />
        <p className="caption-r text-blue-4 mt-4">
          이미지 업로드를 하지 않을 경우 기본 이미지로 업로드 됩니다.
        </p>
        <div className="w-full flex justify-end items-center mt-2.5 px-2.5 mb-20">
          <div className="flex gap-5 mt-[74px]">
            <ShortButton
              text="취소"
              bgColor=""
              textColor="blue-1"
              onClick={handleCancel}
            />
            <ShortButton
              text="포스트 등록"
              bgColor="blue-1"
              textColor="base-1"
              hoverColor="blue-4"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityEditor;
