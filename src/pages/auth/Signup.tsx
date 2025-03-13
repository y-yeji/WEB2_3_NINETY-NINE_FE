import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/ui/InputField";
import CustomButton from "../../components/ui/CustomButton";
import api from "../../api/api";
import { useModalStore } from "../../stores/modalStore";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "올바른 이메일을 입력하세요.";
      isValid = false;
    }

    if (!/^[a-zA-Z0-9가-힣]{1,8}$/.test(form.nickname)) {
      newErrors.nickname = "닉네임은 8자 이내, 특수문자 제외하여 입력하세요.";
      isValid = false;
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
        form.password
      )
    ) {
      newErrors.password =
        "8~16자의 영문 대/소문자, 숫자, 특수문자 조합으로 입력해주세요.";
      isValid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    const { openModal } = useModalStore.getState();
    if (!validate()) return;
    try {
      await api.post(
        "/api/signup",
        {
          email: form.email,
          nickname: form.nickname,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      openModal("회원가입이 완료되었습니다.🎉", "", "닫기", 
        () => navigate("/login")  
      );
    } catch (error) {
      console.error("회원가입 실패:", error);
      setForm({
        email: "",
        nickname: "",
        password: "",
        confirmPassword: "",
      });
      openModal("회원가입에 실패했습니다.", "", "닫기");
    }
  };

  return (
    <div className="mx-10 mt-64 h-[50vh] w-full flex flex-col items-center justify-center">
      <h2 className="text-4xl  my-[60px] font-dm italic text-blue-1">
        On culture
      </h2>

      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <InputField
          label="이메일"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={form.email}
          onChange={handleChange}
          errorMessage={errors.email}
        />
        <InputField
          label="닉네임"
          name="nickname"
          placeholder="닉네임을 입력해주세요."
          value={form.nickname}
          onChange={handleChange}
          errorMessage={errors.nickname}
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
        <InputField
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시 입력하세요."
          value={form.confirmPassword}
          onChange={handleChange}
          errorMessage={errors.confirmPassword}
        />
        <div className="w-full max-w-md flex flex-col items-center gap-10">
          <CustomButton
            text="회원가입"
            bgColor="bg-blue-7"
            onClick={handleSignUp}
          />
          <CustomButton
            text="로그인 하러 가기"
            bgColor="bg-blue-7"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
