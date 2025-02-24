import ImageUploader from "../../components/common/ImageUploader";
import InputField from "../../components/common/InputField";
import QuillEditor from "../../components/common/QuillEditor";
import ShortButton from "../../components/ui/ShortButton";

const CommunityEditor = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <div className="mt-[100px]">
        <InputField
          placeholder="제목을 입력해주세요."
          customStyle="w-[1200px] h-[50px] mt-[67px] mb-5 body-l-m border-gray-5"
        />
        <QuillEditor />
        <ImageUploader />
        <div className="w-full flex justify-between items-center mt-2.5 px-2.5">
          <p className="caption-r text-blue-4">
            이미지 업로드를 하지 않을 경우 기본 이미지로 업로드 됩니다.
          </p>

          {/* 우측 하단 버튼 */}
          <div className="flex gap-5 mt-[74px]">
            <ShortButton text="취소" bgColor="" textColor="blue-1" />
            <ShortButton
              text="포스트 등록"
              bgColor="blue-1"
              textColor="base-1"
              hoverColor="blue-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityEditor;
