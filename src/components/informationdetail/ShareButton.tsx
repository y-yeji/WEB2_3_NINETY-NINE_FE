import { useEffect } from "react";
import Icon from "../../assets/icons/Icon";

interface ShareButtonProps {
  url: string;
  title: string;
  posterUrl: string;
}

const KAKAO_APP_KEY = import.meta.env.VITE_APP_KAKAOMAP_KEY;

declare global {
  interface Window {
    Kakao: any;
  }
}

const ShareButton = ({ url, title, posterUrl }: ShareButtonProps) => {
  useEffect(() => {
    if (!window.Kakao) {
      const kakaoScript = document.createElement("script");
      kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.js";
      kakaoScript.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_APP_KEY);
        }
      };
      document.body.appendChild(kakaoScript);
    } else if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_APP_KEY);
    }
  }, []);

  const handleShare = () => {
    if (window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          description: "자세한 내용을 보려면 클릭하세요",
          imageUrl: posterUrl.startsWith("http")
            ? posterUrl
            : `http://localhost:5173${posterUrl}`,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      });
    } else {
      console.error("Kakao SDK가 로드되지 않았습니다.");
    }
  };

  return (
    <button
      className="w-8 h-8 rounded-[8px] bg-blue-6 hover:bg-blue-6/80 flex justify-center items-center"
      onClick={handleShare}
    >
      <Icon name="Share2" className="w-6 h-6 text-white" />
    </button>
  );
};

export default ShareButton;
