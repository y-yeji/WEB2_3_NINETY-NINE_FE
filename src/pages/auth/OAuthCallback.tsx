import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (!code) {
      console.error("인가 코드가 없습니다.");
      navigate("/login");
      return;
    }

    console.log("인가 코드:", code);

    // const sendCodeToBackend = async () => {
    //   try {
    //     const response = await axios.get(
    //       `http://15.164.154.120:8080/api/social-login?code=${code}`
    //     );

    //     console.log("백엔드 응답 데이터:", response.data);

    //     if (response.data.token) {
    //       console.log("JWT 토큰:", response.data.token);

    //       localStorage.setItem("jwt", response.data.token);

    //       navigate("/");
    //     } else {
    //       console.error("로그인 실패");
    //       navigate("/login");
    //     }
    //   } catch (error) {
    //     console.error("백엔드 요청 중 오류 발생:", error);
    //     navigate("/login");
    //   }
    // };

    // sendCodeToBackend();
  }, [navigate]);

  return (
    <div>
      <h1>로그인 중입니다...</h1>
    </div>
  );
};

export default OAuthCallback;
