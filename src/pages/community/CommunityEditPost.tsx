import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploader from "../../components/common/ImageUploader";
import InputField from "../../components/ui/InputField";
import QuillEditor from "../../components/texteditor/QuillEditor";
import ShortButton from "../../components/ui/ShortButton";
import api from "../../api/api";

const CommunityEditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrls, setImageUrls] = useState<(File | string)[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await api.get(`/api/socialPosts/${postId}`);
        const { title, content, imageUrls } = response.data.data;

        setTitle(title);
        setContent(content);
        setImageUrls(imageUrls || []);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생", error);
      }
    };

    if (postId) fetchPostData();
  }, [postId]);


  const handleImageUpload = (images: (File | string)[]) => {
    setImageUrls(images);
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

    
    imageUrls.forEach((img) => {
      if (typeof img === "string") {
        formData.append("existingImages", img); 
      } else {
        formData.append("images", img); 
      }
    });

    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.put(`/api/socialPosts/${postId}`, formData, {
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
      "정말로 게시글 수정을 취소하시겠습니까?"
    );
    if (confirmCancel) navigate(`/socialPosts/${postId}`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="mt-[100px]">
        <InputField
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <QuillEditor value={content} onChange={setContent} />
        <ImageUploader onUpload={handleImageUpload} initialImages={imageUrls} />

        <div className="w-full flex justify-between items-center mt-2.5 px-2.5">
          <ShortButton
            text="취소"
            textColor="blue-1"
            bgColor="base-1"
            onClick={handleCancel}
          />
          <ShortButton
            text="포스트 수정"
            bgColor="blue-1"
            textColor="base-1"
            hoverColor="blue-4"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityEditPost;
