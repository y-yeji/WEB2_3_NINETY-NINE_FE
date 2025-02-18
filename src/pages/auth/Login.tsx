import GoogleLogo from "../../assets/GoogleLogo.svg";
import KakaoLogo from "../../assets/KakaoLogo.svg";
import InputField from "../../components/common/InputField";
import CustomButton from "../../components/ui/CustomButton";

const Login = () => {
  return (
    <div className="max-w-[1200px] mx-10 w-full flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl mt-[264px] mb-[250px] font-serif italic text-blue-1">
        On culture
      </h2>

      <div className="w-full max-w-md p-8 rounded-[8px] flex flex-col items-center ">
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
        {/* 구분선 */}
        <div className="mb-8 flex items-center w-[500px]">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">간편 로그인</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <CustomButton
          text="Google로 시작하기"
          bgColor="bg-white"
          borderColor="border-blue-1"
          iconSrc={GoogleLogo}
          onClick={() => console.log("구글 로그인 클릭")}
        />
        <CustomButton
          text="Kakao로 시작하기"
          bgColor="bg-white"
          borderColor="border-blue-1"
          iconSrc={KakaoLogo}
          onClick={() => console.log("카카오 로그인 클릭")}
        />
      </div>
    </div>
  );
};

export default Login;
