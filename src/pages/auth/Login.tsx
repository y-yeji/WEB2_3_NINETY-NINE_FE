import { useState } from "react";
import { useNavigate } from "react-router-dom";
import googlelogo from "../../assets/google.svg";
import kakaologo from "../../assets/kakao.svg";
import DividerWithText from "../../components/ui/DividerWithText";
import InputField from "../../components/ui/InputField";
import CustomButton from "../../components/ui/CustomButton";
import { useAuthStore } from "../../stores/authStore";
import { useModalStore } from "../../stores/modalStore";

const socialLoginUrl = import.meta.env.VITE_SOCIAL_LOGIN_URL;

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const { openModal } = useModalStore.getState();
    const { login } = useAuthStore.getState();
    let newErrors = { email: "", password: "" };

    if (!form.email) newErrors.email = "이메일을 입력해주세요.";
    if (!form.password) newErrors.password = "비밀번호를 입력해주세요.";

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(form.email, form.password);
      await login(form.email, form.password);
      openModal(
        "로그인 성공!\n온컬쳐에 온 걸 환영합니다.🎉",
        "",
        "닫기",
        () => navigate("/")
      );
    } catch (error) {
      openModal("아이디 또는 비밀번호가 잘못되었습니다.", "", "닫기");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  return (
    <div className="mx-10 mt-64 h-[50vh] w-full flex flex-col items-center justify-center">
      <h2 className="text-4xl my-[60px] font-dm italic text-blue-1">
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
          onClick={() =>
            (window.location.href = `${socialLoginUrl}/oauth2/authorization/google`)
          }
        />
        <CustomButton
          text="Kakao로 시작하기"
          bgColor="bg-white"
          borderColor="border-blue-1"
          iconSrc={kakaologo}
          onClick={() =>
            (window.location.href = `${socialLoginUrl}/oauth2/authorization/kakao`)
          }
        />
      </div>
    </div>
  );
};

export default Login;
