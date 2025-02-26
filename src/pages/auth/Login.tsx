import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import googlelogo from "../../assets/google.svg";
import kakaologo from "../../assets/kakao.svg";
import DividerWithText from "../../components/common/DividerWithText";
import InputField from "../../components/ui/InputField";
import CustomButton from "../../components/ui/CustomButton";

const KAKAO_REST_API_KEY = import.meta.env.VITE_K_REST_API_KEY;
const GOOGLE_AUTH_CLIENT_ID = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
const KAKAO_REDIRECT_URI = "http://localhost:5173/oauth/callback";
const GOOGLE_REDIRECT_URI = "http://localhost:5173/oauth/callback";
const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleLogin = async () => {
    let newErrors = { email: "", password: "" };

    if (!form.email) newErrors.email = "이메일을 입력해주세요.";
    if (!form.password) newErrors.password = "비밀번호를 입력해주세요.";

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://15.164.154.120:8080/api/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
      console.log(`email: ${form.email} , password: ${form.password}`);
      // localStorage.setItem("jwt", response.data.token);
      // localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);

      setErrors({
        email: "",
        password: "이메일 또는 비밀번호가 잘못되었습니다.",
      });
    }
  };

  return (
    <div className="mx-10 w-full flex flex-col items-center justify-center">
      <h2 className="text-4xl mt-[264px] mb-[250px] font-serif italic text-blue-1">
        On culture
      </h2>

      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <InputField
          label="이메일"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={form.email}
          onChange={handleChange}
          errorMessage={errors.email}
        />

        <InputField
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={form.password}
          onChange={handleChange}
          errorMessage={errors.password}
        />

        <CustomButton text="로그인" bgColor="bg-blue-7" onClick={handleLogin} />
        <CustomButton
          text="이메일 회원가입"
          bgColor="bg-blue-7"
          onClick={() => navigate("/signup")}
        />

        <DividerWithText text="간편 로그인" />

        <CustomButton
          text="Google로 시작하기"
          bgColor="bg-white"
          borderColor="border-blue-1"
          iconSrc={googlelogo}
          onClick={() => (window.location.href = googleUrl)}
        />
        <CustomButton
          text="Kakao로 시작하기"
          bgColor="bg-white"
          borderColor="border-blue-1"
          iconSrc={kakaologo}
          onClick={() => (window.location.href = kakaoUrl)}
        />
      </div>
    </div>
  );
};

export default Login;
