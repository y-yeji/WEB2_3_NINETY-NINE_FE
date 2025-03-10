import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URL(window.location.href).searchParams.get(
      "access_token"
    );

    if (!token) {
      console.error("액세스 토큰이 없습니다.");
      navigate("/login");
      return;
    }
    localStorage.setItem("access_token", token);
    console.log("로그인 성공! 액세스 토큰:", token);
    // useAuthStore.getState().checkAuth();
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <h1>로그인 중입니다...</h1>
    </div>
  );
};

export default OAuthCallback;
