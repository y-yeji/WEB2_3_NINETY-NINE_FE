import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import InterestIcon from "../ui/InterestIcon";
import { UserData } from "../../types/User";

const ProfileHeader = ({
  nickname = "닉네임을 설정해주세요.",
  description = "소개글을 작성해주세요.",
  interests = [],
  profileImage = "/default-image.png",
  isMyPage = false,
}: UserData) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center mt-[50px]">
      <div className="flex items-center gap-[54px]">
        <img
          src={profileImage}
          alt="Profile"
          className="w-[150px] h-[150px] rounded-full object-cover"
        />
        <div className="flex flex-col justify-center h-[150px]">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold w-[240px]">{nickname}</h2>
            {isMyPage && (
              <button onClick={() => navigate("/mypage/edit")}>
                <Icon name="Settings" />
              </button>
            )}
          </div>
          <div className="flex justify-start mt-[24px] w-[280px]">
            <div className="w-[280px] flex flex-wrap gap-2 mt-3">
              {interests.length > 0 ? (
                interests.map((item, index) => (
                  <InterestIcon key={index} type={item} />
                ))
              ) : (
                <p className="text-gray-40 body-n-r">
                  관심있는 문화생활 카테고리를 설정해보세요.
                </p>
              )}
            </div>
          </div>
          <p className="text-gray-40 body-n-r w-[280px] mt-[24px]">
            {description || "자신을 한 문장으로 소개해주세요."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
