import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploader from "../../components/common/ImageUploader";
import InputField from "../../components/ui/InputField";
import QuillEditor from "../../components/texteditor/QuillEditor";
import ShortButton from "../../components/ui/ShortButton";
import api from "../../api/api";
import { useModalStore } from "../../stores/modalStore";

const CommunityEditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrls, setImageUrls] = useState<(File | string)[]>([]);
  const [updated, setUpdated] = useState(false);
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
    setUpdated(true);
  };

  useEffect(() => {
    if (updated) {
      setUpdated(false);
    }
  }, [imageUrls]);

  const handleSubmit = () => {
    const { openModal } = useModalStore.getState();
    if (!title.trim() || !content.trim()) {
      openModal("제목과 내용을 입력해주세요.", "", "닫기");
      return;
    }
    openModal("게시글을 수정하시겠습니까?", "취소", "확인", async () => {
      const formData = new FormData();
      const requestDTO = { title, content };
      formData.append("requestDTO", JSON.stringify(requestDTO));
      imageUrls.forEach((img) => {
        formData.append("images", img);
      });

      try {
        const token = localStorage.getItem("accessToken");
        await api.put(`/api/socialPosts/${postId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        });
        openModal("게시글이 수정되었습니다.", "", "확인", () => {
          navigate("/mypage");
        });
      } catch (error) {
        console.error("게시글 수정 중 오류 발생", error);
        openModal("게시글 수정 중 오류가 발생했습니다.", "", "닫기");
      }
    });
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "정말로 게시글 수정을 취소하시겠습니까?"
    );
    if (confirmCancel) navigate(`/socialPosts/${postId}`);
  };


  console.log(imageUrls);
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
              text="포스트 수정"
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

export default CommunityEditPost;
