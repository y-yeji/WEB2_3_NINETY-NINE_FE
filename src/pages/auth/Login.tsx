const Login = () => {
  return (
    <div className="max-w-[1200px] mx-10 w-full flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-serif mt-[264px] mb-[250px]">On culture</h2>

      <div className="w-full max-w-md p-8 rounded-[8px] flex flex-col items-center ">
        {/* 이메일 입력 */}
        <div className="mb-4 w-[500px]">
          <label className="block text-gray-700 pl-2 text-sm font-bold mb-2">
            이메일
          </label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요."
            className="w-[500px] h-[50px] px-4 border  border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-red-500 text-sm mt-1 pl-2">
            이메일을 확인해주세요.
          </p>
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-4 relative w-[500px]">
          <label className="block mt-6 pl-2 text-gray-700 text-sm font-bold mb-2">
            비밀번호
          </label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="w-[500px] h-[50px] px-4 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-red-500 text-sm mt-1 pl-2">
            비밀번호를 입력해주세요.
          </p>
        </div>

        {/* 버튼들 */}
        <button className="w-[500px] h-[50px] bg-blue-300 text-white rounded-[8px] hover:bg-blue-400 transition mt-10 mb-7">
          로그인
        </button>
        <button className="w-[500px] h-[50px] bg-blue-500 text-white rounded-[8px] hover:bg-blue-600 transition ">
          이메일 회원가입
        </button>

        {/* 구분선 */}
        <div className="my-8 flex items-center w-[500px]">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">간편 로그인</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google 로그인 */}
        <button className="w-[500px] h-[50px] flex items-center justify-center bg-white border rounded-[8px] shadow hover:shadow-md transition mb-6">
          Google로 시작하기
        </button>

        {/* Kakao 로그인 */}
        <button className="w-[500px] h-[50px] flex items-center justify-center bg-yellow-300 rounded-[8px] hover:bg-yellow-400 transition">
          Kakao로 시작하기
        </button>
      </div>
    </div>
  );
};

export default Login;
