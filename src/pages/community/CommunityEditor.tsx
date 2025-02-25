import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageUploader from "../../components/common/ImageUploader";
import InputField from "../../components/common/InputField";
import QuillEditor from "../../components/common/QuillEditor";
import ShortButton from "../../components/ui/ShortButton";

const CommunityEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const confirmPost = window.confirm("게시글을 등록하시겠습니까?");
    if (!confirmPost) return;

    const postData = {
      title,
      content,
      imageUrl: imageUrl.length > 0 ? imageUrl : "default-image-url",
    };

    console.log(postData);
    try {
      const response = await axios.post(
        "http://15.164.154.120:8080/api/socialPosts",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("게시글 등록 완료", response.data);
      alert("게시글이 등록되었습니다.");
      navigate("/"); 
    } catch (error) {
      console.error("에러 발생", error);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("정말로 게시글 작성을 취소하시겠습니까?");
    if (confirmCancel) {
      setTitle("");
      setContent("");
      setImageUrl([]);
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
        <ImageUploader onUpload={setImageUrl} />
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
