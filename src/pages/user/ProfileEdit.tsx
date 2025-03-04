import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import InterestsIcon from "../../components/ui/InterestsIcon";
import api from "../../api/api";

interface UserProfile {
  nickname: string;
  loginType: string;
  description: string;
  interests: string[];
  profileImage: string;
  s3Bucket: string;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

interface UpdateData {
  nickname: string;
  description: string;
  interests: string[];
  profileImage: string;
  password?: string;
}

const ProfileEdit = () => {
  const navigate = useNavigate();
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
  const [profileImageUrl, setProfileImageUrl] = useState("/default-image.png");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    null | boolean
  >(null);
  const [message, setMessage] = useState("");
  const [originalNickname, setOriginalNickname] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loginType, setLoginType] = useState<string>("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<ApiResponse<UserProfile>>("/api/profile");
      const userData = response.data.data;

      setNickname(userData.nickname || "");
      setOriginalNickname(userData.nickname || "");
      setIntroduction(userData.description || "");
      setActiveButtons(userData.interests || []);
      setLoginType(userData.loginType || "");

      if (userData.profileImage) {
        setProfileImageUrl(userData.s3Bucket || "/default-image.png");
      } else {
        setProfileImageUrl("/default-image.png");
      }
    } catch (error) {
      console.error("프로필 정보를 불러오는데 실패했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    if (value.length > 8) {
      setNicknameError("8자 이내의 닉네임을 입력해주세요");
    } else {
      setNicknameError("");
    }

    // 원래 닉네임과 같은 경우 중복 확인 필요 없음
    if (value === originalNickname) {
      setIsNicknameAvailable(true);
      setMessage("기존 닉네임입니다.");
    } else {
      setIsNicknameAvailable(null); // 닉네임 입력할 때마다 상태 초기화
      setMessage("");
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

  const checkNicknameAvailability = async () => {
    if (!nickname.trim()) {
      setMessage("닉네임을 입력해주세요.");
      setIsNicknameAvailable(null);
      return;
    }

    // 원래 닉네임과 같은 경우 중복 확인 필요 없음
    if (nickname === originalNickname) {
      setIsNicknameAvailable(true);
      setMessage("기존 닉네임입니다.");
      return;
    }

    try {
      const response = await fetch("/api/check-nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname }),
      });

      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }

      const data = await response.json();

      if (data.code === 200 && data.success) {
        setIsNicknameAvailable(!data.data);
        setMessage(
          data.data
            ? "이미 사용 중인 닉네임입니다."
            : "사용 가능한 닉네임입니다."
        );
      } else {
        setMessage("오류 발생: " + data.message);
        setIsNicknameAvailable(null);
      }
    } catch (error) {
      setMessage("네트워크 오류가 발생했습니다.");
      setIsNicknameAvailable(null);
    }
  };

  const toggleImageEdit = () => {
    setShowImageEdit(!showImageEdit);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfileImageUrl(previewUrl);
      setShowImageEdit(false);
    }
  };

  const handleRemoveImage = () => {
    setProfileImageUrl("/default-image.png");
    setSelectedFile(null);
    setShowImageEdit(false);
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

  const renderInterestIcon = (button: string) => {
    const color = buttonColors[button];

    return (
      <InterestsIcon
        key={button}
        name={button}
        isActive={true} // 활성화된 상태로 표시
        color={color}
        as="div" // div로 렌더링
      />
    );
  };

  const displayNickname = nickname.slice(0, 8);
  const displayIntroduction = introduction.slice(0, 20);

  const validatePassword = () => {
    // 비밀번호 입력이 없으면 유효성 검사를 통과
    if (!password) {
      setPasswordError("");
      return true;
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
        password
      )
    ) {
      setPasswordError(
        "8~16자의 영문 대/소문자, 숫자, 특수문자 조합으로 입력해주세요."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateConfirmPassword = () => {
    // 비밀번호 입력이 없으면 유효성 검사를 통과
    if (!password) {
      setConfirmPasswordError("");
      return true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!selectedFile) return "";

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await api.post("/api/upload-profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        return response.data.data.imageUrl || "";
      }
      return "";
    } catch (error) {
      console.error("이미지 업로드 중 오류가 발생했습니다.", error);
      return "";
    }
  };

  const handleSubmit = async () => {
    // 닉네임이 바뀌었는데 중복확인을 안 한 경우
    if (nickname !== originalNickname && isNicknameAvailable === null) {
      setMessage("닉네임 중복 확인을 해주세요.");
      return;
    }

    // 유효성 검사
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (
      nicknameError ||
      introductionError ||
      (password && (!isPasswordValid || !isConfirmPasswordValid))
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 이미지 업로드 처리
      let imageUrl = "";
      if (selectedFile) {
        imageUrl = await uploadImage();
      }

      const updateData: UpdateData = {
        nickname: nickname,
        description: introduction,
        interests: activeButtons,
        profileImage: imageUrl || profileImageUrl,
      };

      // 비밀번호가 입력된 경우에만 포함
      if (password) {
        updateData.password = password;
      }

      const response = await api.put("/api/user", updateData);

      if (response.data.success) {
        setUpdateSuccess(true);
        setUpdateError("");

        // 성공 메시지를 잠시 보여준 후 홈으로 리다이렉트
        setTimeout(() => {
          navigate("/"); // 홈으로 이동
        }, 1500);
      } else {
        setUpdateError(response.data.message || "프로필 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("오류가 발생했습니다.", error);
      setUpdateError("오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // 사용자에게 수정 사항을 저장하지 않고 홈으로 돌아갈지 묻기
    if (
      nickname !== originalNickname ||
      introduction !== introduction ||
      password ||
      selectedFile
    ) {
      if (
        window.confirm("수정 사항을 저장하지 않고 홈으로 돌아가시겠습니까?")
      ) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full flex flex-col mx-auto">
      <div className="mt-[108px] max-w-[1280px] mx-auto p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-blue-1">로딩 중...</p>
          </div>
        ) : (
          <>
            <div className="w-full flex flex-col items-center mt-[50px]">
              <div className="flex items-center gap-[54px]">
                <div className="relative">
                  <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                    <img
                      src={profileImageUrl}
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
                      <label className="body-small-r text-gray-90 hover:text-blue-4 cursor-pointer">
                        이미지 변경
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                      <button
                        className="body-small-r text-gray-90 hover:text-blue-4"
                        onClick={handleRemoveImage}
                      >
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
                      activeButtons.map((button) => renderInterestIcon(button))
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

            {/* 성공 및 에러 메시지 */}
            {updateSuccess && (
              <div className="w-[784px] mx-auto mb-4 p-3 bg-green-100 text-green-800 rounded">
                프로필이 성공적으로 업데이트되었습니다. 홈으로 이동합니다...
              </div>
            )}
            {updateError && (
              <div className="w-[784px] mx-auto mb-4 p-3 bg-red-100 text-red-800 rounded">
                {updateError}
              </div>
            )}

            <div className="flex flex-col items-center gap-6">
              <div className="w-[784px] relative">
                <div className="flex items-center mb-2">
                  <label className="block body-large-r text-blue-1 ml-3">
                    닉네임
                  </label>
                  {nicknameError && !message && (
                    <span className="ml-2 body-small-r text-red-error">
                      {nicknameError}
                    </span>
                  )}
                  {message && (
                    <span
                      className={`ml-2 body-small-r ${
                        isNicknameAvailable
                          ? "text-green-500"
                          : "text-red-error"
                      }`}
                    >
                      {message}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  className={`w-full h-[50px] rounded-lg bg-white border ${
                    nicknameError || (message && !isNicknameAvailable)
                      ? "border-red-error"
                      : isNicknameAvailable
                        ? "border-green-500"
                        : "border-blue-7 focus:border-blue-1"
                  } px-3 pr-[100px]`}
                  placeholder="8자 이내의 닉네임를 입력해주세요"
                />
                <button
                  className={`absolute top-1/2 right-3 translate-y-[10%] w-[72px] h-[30px] rounded ${
                    nickname === originalNickname
                      ? "bg-gray-40 text-base-1 cursor-not-allowed"
                      : "bg-blue-1 text-base-1 hover:bg-base-1 hover:text-blue-1 border border-blue-1"
                  } body-small-r`}
                  onClick={() => {
                    if (nicknameError || nickname === originalNickname) return;
                    checkNicknameAvailability();
                  }}
                  disabled={nickname === originalNickname}
                >
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
                  placeholder="20자 이내의 한 줄 소개를 입력해주세요"
                />
              </div>
              {loginType !== "SOCIAL_ONLY" && (
                <>
                  <div className="w-[784px]">
                    <label className="block body-large-r text-blue-1 ml-3 mb-2">
                      비밀번호 변경
                      {passwordError && (
                        <span className="body-small-r text-red-error ml-2">
                          {passwordError}
                        </span>
                      )}
                    </label>
                    <input
                      type="password"
                      className="w-full h-[50px] rounded-lg bg-white border border-blue-7 focus:border-blue-1 px-3"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={validatePassword}
                      placeholder="영문 대/소문자, 숫자, 특수문자 각각 최소 1개 포함 8~16자 비밀번호를 입력해주세요"
                    />
                  </div>
                  <div className="w-[784px]">
                    <label className="block body-large-r text-blue-1 ml-3 mb-2">
                      비밀번호 확인
                      {confirmPasswordError && (
                        <span className="body-small-r text-red-error ml-2">
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
                      placeholder="비밀번호를 다시 입력하세요"
                      disabled={!password}
                    />
                  </div>
                </>
              )}
              <div className="w-[784px]">
                <label className="block body-large-r text-blue-1 ml-3 mb-2">
                  선호 분야 설정
                  <span className="body-small-r text-blue-6 ml-2">
                    최대 3개의 선호분야를 선택해주세요
                  </span>
                </label>
                <div className="w-full h-[92px] rounded-lg bg-white border border-blue-7 flex justify-center items-center">
                  <div className="flex flex-wrap gap-7">
                    <InterestsIcon
                      name="팝업 스토어"
                      isActive={activeButtons.includes("팝업 스토어")}
                      onClick={() => toggleButton("팝업 스토어")}
                      disabled={
                        activeButtons.length >= 3 &&
                        !activeButtons.includes("팝업 스토어")
                      }
                      as="button" // button 태그로 사용
                    />
                    <InterestsIcon
                      name="전시회"
                      isActive={activeButtons.includes("전시회")}
                      onClick={() => toggleButton("전시회")}
                      disabled={
                        activeButtons.length >= 3 &&
                        !activeButtons.includes("전시회")
                      }
                      as="button" // button 태그로 사용
                    />
                    <InterestsIcon
                      name="뮤지컬"
                      isActive={activeButtons.includes("뮤지컬")}
                      onClick={() => toggleButton("뮤지컬")}
                      disabled={
                        activeButtons.length >= 3 &&
                        !activeButtons.includes("뮤지컬")
                      }
                      as="button" // button 태그로 사용
                    />
                    <InterestsIcon
                      name="연극"
                      isActive={activeButtons.includes("연극")}
                      onClick={() => toggleButton("연극")}
                      disabled={
                        activeButtons.length >= 3 &&
                        !activeButtons.includes("연극")
                      }
                      as="button" // button 태그로 사용
                    />
                    <InterestsIcon
                      name="페스티벌"
                      isActive={activeButtons.includes("페스티벌")}
                      onClick={() => toggleButton("페스티벌")}
                      disabled={
                        activeButtons.length >= 3 &&
                        !activeButtons.includes("페스티벌")
                      }
                      as="button" // button 태그로 사용
                    />
                    <InterestsIcon
                      name="콘서트"
                      isActive={activeButtons.includes("콘서트")}
                      onClick={() => toggleButton("콘서트")}
                      disabled={
                        activeButtons.length >= 3 &&
                        !activeButtons.includes("콘서트")
                      }
                      as="button" // button 태그로 사용
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8 w-[784px] mx-auto">
              <button
                className="body-small-r w-[120px] h-10 rounded bg-base-1 border border-blue-1 text-blue-1"
                onClick={handleCancel}
              >
                취소
              </button>
              <button
                className={`body-small-r w-[120px] h-10 rounded ${
                  isSubmitting
                    ? "bg-gray-40 cursor-not-allowed"
                    : "bg-blue-1 hover:bg-blue-4"
                } text-base-1`}
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  (nickname !== originalNickname && !isNicknameAvailable)
                }
              >
                {isSubmitting ? "처리 중..." : "회원정보 수정"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;
