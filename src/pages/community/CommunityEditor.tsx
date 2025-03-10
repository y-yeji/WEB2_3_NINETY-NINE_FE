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

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const confirmPost = window.confirm("게시글을 등록하시겠습니까?");
    if (!confirmPost) return;

    const requestDTO = { title, content };
    const formData = new FormData();
    formData.append("requestDTO", JSON.stringify(requestDTO));
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
    } else {
      formData.append("images", "default-image.jpg");
    }

    console.log("FormData 전송:", formData);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/api/socialPosts", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("게시글 등록 완료:", response.data);
      alert("게시글이 등록되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error("에러 발생", error);
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
        <ImageUploader onUpload={setImageFiles} />
        <div className="w-full flex justify-between items-center mt-2.5 px-2.5">
          <p className="caption-r text-blue-4">
            이미지 업로드를 하지 않을 경우 기본 이미지로 업로드 됩니다.
          </p>

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
