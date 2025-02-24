import googlelogo from "../../assets/google.svg";
import kakaologo from "../../assets/kakao.svg";
import InputField from "../../components/common/InputField";
import CustomButton from "../../components/ui/CustomButton";

const KAKAO_REST_API_KEY = import.meta.env.VITE_K_REST_API_KEY;
const KAKAO_REDIRECT_URI = "http://localhost:5173/oauth/callback";
const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
const Login = () => {
  const handleKakaoLogin = () => {
    window.location.href = kakaoUrl;
  };

  return (
    <div className="mx-10 w-full flex flex-col items-center justify-center ">
      <h2 className="text-4xl mt-[264px] mb-[250px] font-serif italic text-blue-1">
        On culture
      </h2>

      <div className="w-full max-w-md flex flex-col items-center gap-10 ">
        <InputField
          label="이메일"
          name="email"
          placeholder="이메일을 입력해주세요."
          errorMessage="이메일을 확인해주세요."
        />
        <InputField
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          errorMessage="비밀번호를 확인해주세요."
        />

        <CustomButton
          text="로그인"
          bgColor="bg-blue-7"
          onClick={() => console.log("로그인 클릭")}
        />
        <CustomButton
          text="이메일 회원가입"
          bgColor="bg-blue-7"
          onClick={() => console.log("이메일 회원가입 클릭")}
        />
        <div className="flex items-center w-[500px]">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">간편 로그인</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <CustomButton
          text="Google로 시작하기"
          bgColor="bg-white"
          borderColor="border-blue-1"
          iconSrc={googlelogo}
          onClick={() => console.log("구글 로그인 클릭")}
        />
        <CustomButton
          text="Kakao로 시작하기"
          bgColor="bg-white"
          borderColor="border-blue-1"
          iconSrc={kakaologo}
          onClick={handleKakaoLogin}
        />
      </div>
    </div>
  );
};

export default Login;
