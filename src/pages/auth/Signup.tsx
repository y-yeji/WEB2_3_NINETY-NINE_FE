import InputField from "../../components/common/InputField";
import CustomButton from "../../components/ui/CustomButton";

const SignUp = () => {
  return (
    <div className="mx-10 w-full flex flex-col items-center justify-center ">
      <h2 className="text-4xl mt-[264px] mb-[250px] font-serif italic text-blue-1">
        On culture
      </h2>

      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <InputField
          label="이메일"
          name="email"
          placeholder="이메일을 입력해주세요."
          errorMessage="이메일을 확인해주세요."
        />
        <InputField
          label="닉네임"
          name="nickname"
          placeholder="닉네임을 입력해주세요."
          errorMessage="닉네임은 8자 이내, 특수문자 제외하여 입력하세요."
        />
        <InputField
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          errorMessage="8~16자의 영문 대/소문자, 숫자, 특수문자 조합으로 입력해주세요."
        />
        <InputField
          label="비밀번호 확인"
          name="confirmpassword"
          placeholder="비밀번호를 다시 입력하세요."
          errorMessage="비밀번호가 일치하지 않습니다."
        />
        <div className="w-full max-w-md flex flex-col items-center gap-10">
          <CustomButton
            text="회원가입"
            bgColor="bg-blue-7"
            onClick={() => console.log("회원가입 클릭")}
          />
          <CustomButton
            text="로그인 하러 가기"
            bgColor="bg-blue-7"
            onClick={() => console.log("로그인 하러가기 클릭")}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
