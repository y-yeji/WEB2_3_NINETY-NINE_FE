import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const OAuthCallback = () => {
  const { checkAuth, isLoggedIn, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const accessToken = new URL(window.location.href).searchParams.get("access_token");

      if (!accessToken) {
        console.error("액세스 토큰이 없습니다.");
        navigate("/login");
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      console.log("로그인 성공! 액세스 토큰:", accessToken);

      await checkAuth();
    };

    handleAuth();
  }, [checkAuth, navigate]);

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("user:", user);

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
