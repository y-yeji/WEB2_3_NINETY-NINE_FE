import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/common/ImageUploader";
import InputField from "../../components/ui/InputField";
import QuillEditor from "../../components/texteditor/QuillEditor";
import ShortButton from "../../components/ui/ShortButton";
import api from "../../api/api";

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
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const confirmPost = window.confirm("게시글을 수정하시겠습니까?");
    if (!confirmPost) return;

    const formData = new FormData();
    const requestDTO = { title, content };
    formData.append("requestDTO", JSON.stringify(requestDTO));

    imageFiles.forEach((img) => {
      if (typeof img === "string") {
        formData.append("existingImages", img);
      } else {
        formData.append("images", img);
      }
    });

    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.put("/api/socialPosts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      console.log("게시글 수정 완료", response.data);
      alert("게시글이 수정되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error("게시글 수정 중 오류 발생", error);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "정말로 게시글 작성을 취소하시겠습니까?"
    );
    if (confirmCancel) {
      setTitle("");
      setContent("");
      setImageFiles([]);
      navigate("/");
    }
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
        {/* 🔹 수정된 부분: handleImageUpload 함수 적용 */}
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
