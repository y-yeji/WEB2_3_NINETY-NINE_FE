import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const OAuthCallback = () => {
  const { checkAuth, isLoggedIn, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const accessToken = new URL(window.location.href).searchParams.get(
        "access_token"
      );

      if (!accessToken) {
        console.error("액세스 토큰이 없습니다.");
        navigate("/login");
        return;
      }

      localStorage.setItem("accessToken", accessToken);

      try {
        await checkAuth();
      } catch (error) {
        console.error("checkAuth 실행 중 오류:", error);
        navigate("/login");
      }
    };

    handleAuth();
  }, [checkAuth, navigate]);

  useEffect(() => {
    if (isLoggedIn && user) {
      navigate("/");
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <div>
      <h1>로그인 중입니다...</h1>
    </div>
  );
};

export default OAuthCallback;
