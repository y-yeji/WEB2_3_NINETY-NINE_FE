import { useState, useEffect } from "react";
import Icon from "../../assets/icons/Icon";

const ProfileEdit = () => {
  const [showImageEdit, setShowImageEdit] = useState(false);
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [introductionError, setIntroductionError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userData = {
        nickname: "NINETY9",
        introduction: "",
        preferences: [],
      };

      setNickname(userData.nickname);
      setIntroduction(userData.introduction);
      setActiveButtons(userData.preferences);
    };

    fetchData();
  }, []);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    if (value.length > 8) {
      setNicknameError("8자 이내의 닉네임을 입력해주세요");
    } else {
      setNicknameError("");
    }
  };

  const handleIntroductionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIntroduction(value);
    if (value.length > 20) {
      setIntroductionError("20자 이내의 한 줄 소개를 입력해주세요");
    } else {
      setIntroductionError("");
    }
  };

  const toggleImageEdit = () => {
    setShowImageEdit(!showImageEdit);
  };

  const toggleButton = (button: string) => {
    setActiveButtons((prev) => {
      if (prev.includes(button)) {
        return prev.filter((b) => b !== button);
      } else if (prev.length < 3) {
        return [...prev, button];
      }
      return prev;
    });
  };

  const buttonColors: { [key: string]: string } = {
    "팝업 스토어": "#f28c50",
    전시회: "#6d8294",
    뮤지컬: "#a370d8",
    연극: "#ebcb3d",
    페스티벌: "#4dbd79",
    콘서트: "#5e7fe2",
  };

  const buttonClasses = (button: string) =>
    `px-4 h-7 rounded-[140px] body-small-b text-center ${
      activeButtons.includes(button)
        ? `bg-[${buttonColors[button]}] text-white`
        : `bg-[${buttonColors[button]}/50] text-[${buttonColors[button]}]`
    }`;

  const displayNickname = nickname.slice(0, 8);
  const displayIntroduction = introduction.slice(0, 20);

  const validatePassword = () => {
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
        password
      )
    ) {
      setPasswordError(
        "8~16자의 영문 대/소문자, 숫자, 특수문자 조합으로 입력해주세요."
      );
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  return (
    <div className="w-full flex flex-col mx-auto">
      <div className="mt-[108px] max-w-[1280px] mx-auto p-6">
        <div className="w-full flex flex-col items-center mt-[50px]">
          <div className="flex items-center gap-[54px]">
            <div className="relative">
              <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                <img
                  src="/default-image.png"
                  className="w-full h-full object-cover object-center"
                  alt="프로필 이미지"
                />
              </div>
              <button
                className="absolute bottom-2 right-2 w-[30px] h-[30px] rounded-full bg-base-1 border border-blue-1 flex items-center justify-center"
                onClick={toggleImageEdit}
              >
                <Icon name="Pencil" className="w-[18px] h-[18px]" />
              </button>
              {showImageEdit && (
                <div className="absolute bottom-[-50px] flex flex-col justify-center items-center w-[116px] h-16 gap-2.5 px-6 py-2 rounded bg-white border border-blue-7">
                  <button className="body-small-r text-gray-90 hover:text-blue-4">
                    이미지 변경
                  </button>
                  <button className="body-small-r text-gray-90 hover:text-blue-4">
                    이미지 삭제
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center h-[150px]">
              <div className="flex items-center">
                <h2 className="h3-b w-[240px]">{displayNickname}</h2>
              </div>
              <div className="flex justify-start gap-[10px] mt-[24px] w-[280px] flex-wrap">
                {activeButtons.length === 0 ? (
                  <p className="body-normal-r text-gray-40">
                    관심있는 문화생활 카테고리를 설정해보세요.
                  </p>
                ) : (
                  activeButtons.map((button) => (
                    <button key={button} className={buttonClasses(button)}>
                      {button}
                    </button>
                  ))
                )}
              </div>
              <p
                className={`body-normal-r mt-[24px] ${displayIntroduction ? "text-gray-80" : "text-gray-40"}`}
              >
                {displayIntroduction || "자신을 한 문장으로 소개해주세요."}
              </p>
            </div>
          </div>
        </div>
        <div className="border-[4px] border-gray-20 mt-24 mb-[40px]"></div>
        <div className="flex flex-col items-center gap-6">
          <div className="w-[784px] relative">
            <div className="flex items-center mb-2">
              <label className="block body-large-r text-blue-1 ml-3">
                닉네임
              </label>
              {nicknameError && (
                <span className="ml-2 body-small-r text-red-error">
                  {nicknameError}
                </span>
              )}
            </div>
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              className={`w-full h-[50px] rounded-lg bg-white border ${
                nicknameError
                  ? "border-red-error"
                  : "border-blue-7 focus:border-blue-1"
              } px-3 pr-[100px]`}
            />
            <button className="absolute top-1/2 right-3 translate-y-[10%] w-[72px] h-[30px] rounded bg-blue-1 text-base-1 hover:bg-base-1 hover:text-blue-1 border border-blue-1 body-small-r">
              중복 확인
            </button>
          </div>
          <div className="w-[784px]">
            <div className="flex items-center mb-2">
              <label className="block body-large-r text-blue-1 ml-3">
                한 줄 소개
              </label>
              {introductionError && (
                <span className="ml-2 body-small-r text-red-error">
                  {introductionError}
                </span>
              )}
            </div>
            <input
              type="text"
              value={introduction}
              onChange={handleIntroductionChange}
              className={`w-full h-[50px] rounded-lg bg-white border ${
                introductionError
                  ? "border-red-error"
                  : "border-blue-7 focus:border-blue-1"
              } px-3`}
            />
          </div>
          <div className="w-[784px]">
            <label className="block body-large-r text-blue-1 ml-3 mb-2">
              비밀번호 변경
              {passwordError && (
                <span className="text-red-500 ml-2">{passwordError}</span>
              )}
            </label>
            <input
              type="password"
              className="w-full h-[50px] rounded-lg bg-white border border-blue-7 focus:border-blue-1 px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
            />
          </div>
          <div className="w-[784px]">
            <label className="block body-large-r text-blue-1 ml-3 mb-2">
              비밀번호 확인
              {confirmPasswordError && (
                <span className="text-red-500 ml-2">
                  {confirmPasswordError}
                </span>
              )}
            </label>
            <input
              type="password"
              className="w-full h-[50px] rounded-lg bg-white border border-blue-7 focus:border-blue-1 px-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validateConfirmPassword}
            />
          </div>
          <div className="w-[784px]">
            <label className="block body-large-r text-blue-1 ml-3 mb-2">
              선호 분야 설정
            </label>
            <div className="w-full h-[92px] rounded-lg bg-white border border-blue-7 flex justify-center items-center">
              <div className="flex flex-wrap gap-7">
                <button
                  className={`px-4 h-7 rounded-[140px] body-small-b text-center ${
                    activeButtons.includes("팝업 스토어")
                      ? "bg-[#f28c50] text-white"
                      : activeButtons.length >= 3
                        ? "bg-[#f28c50]/50 text-[#f28c50] cursor-not-allowed"
                        : "bg-[#f28c50]/50 text-[#f28c50]"
                  }`}
                  onClick={() => toggleButton("팝업 스토어")}
                  disabled={
                    activeButtons.length >= 3 &&
                    !activeButtons.includes("팝업 스토어")
                  }
                >
                  팝업 스토어
                </button>
                <button
                  className={`px-4 h-7 rounded-[140px] body-small-b text-center ${
                    activeButtons.includes("전시회")
                      ? "bg-[#6d8294] text-white"
                      : activeButtons.length >= 3
                        ? "bg-[#6d8294]/50 text-[#6d8294] cursor-not-allowed"
                        : "bg-[#6d8294]/50 text-[#6d8294]"
                  }`}
                  onClick={() => toggleButton("전시회")}
                  disabled={
                    activeButtons.length >= 3 &&
                    !activeButtons.includes("전시회")
                  }
                >
                  전시회
                </button>
                <button
                  className={`px-4 h-7 rounded-[140px] body-small-b text-center ${
                    activeButtons.includes("뮤지컬")
                      ? "bg-[#a370d8] text-white"
                      : activeButtons.length >= 3
                        ? "bg-[#a370d8]/50 text-[#a370d8] cursor-not-allowed"
                        : "bg-[#a370d8]/50 text-[#a370d8]"
                  }`}
                  onClick={() => toggleButton("뮤지컬")}
                  disabled={
                    activeButtons.length >= 3 &&
                    !activeButtons.includes("뮤지컬")
                  }
                >
                  뮤지컬
                </button>
                <button
                  className={`px-4 h-7 rounded-[140px] body-small-b text-center ${
                    activeButtons.includes("연극")
                      ? "bg-[#ebcb3d] text-white"
                      : activeButtons.length >= 3
                        ? "bg-[#ebcb3d]/50 text-[#ebcb3d] cursor-not-allowed"
                        : "bg-[#ebcb3d]/50 text-[#ebcb3d]"
                  }`}
                  onClick={() => toggleButton("연극")}
                  disabled={
                    activeButtons.length >= 3 && !activeButtons.includes("연극")
                  }
                >
                  연극
                </button>
                <button
                  className={`px-4 h-7 rounded-[140px] body-small-b text-center ${
                    activeButtons.includes("페스티벌")
                      ? "bg-[#4dbd79] text-white"
                      : activeButtons.length >= 3
                        ? "bg-[#4dbd79]/50 text-[#4dbd79] cursor-not-allowed"
                        : "bg-[#4dbd79]/50 text-[#4dbd79]"
                  }`}
                  onClick={() => toggleButton("페스티벌")}
                  disabled={
                    activeButtons.length >= 3 &&
                    !activeButtons.includes("페스티벌")
                  }
                >
                  페스티벌
                </button>
                <button
                  className={`px-4 h-7 rounded-[140px] body-small-b text-center ${
                    activeButtons.includes("콘서트")
                      ? "bg-[#5e7fe2] text-white"
                      : activeButtons.length >= 3
                        ? "bg-[#5e7fe2]/50 text-[#5e7fe2] cursor-not-allowed"
                        : "bg-[#5e7fe2]/50 text-[#5e7fe2]"
                  }`}
                  onClick={() => toggleButton("콘서트")}
                  disabled={
                    activeButtons.length >= 3 &&
                    !activeButtons.includes("콘서트")
                  }
                >
                  콘서트
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-8 w-[784px] mx-auto">
          <button className="body-small-r w-[120px] h-10 rounded bg-base-1 border border-blue-1 text-blue-1">
            취소
          </button>
          <button className="body-small-r w-[120px] h-10 rounded bg-blue-1 text-base-1 hover:bg-blue-4">
            회원정보 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
