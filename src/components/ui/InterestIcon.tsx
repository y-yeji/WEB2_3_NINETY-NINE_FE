interface InterestIconProps {
  type: string;
}
const interestMap: Record<string, { label: string; color: string }> = {
  "팝업 스토어": { label: "팝업 스토어", color: "#f28c50" },
  전시회: { label: "전시회", color: "#6d8294" },
  뮤지컬: { label: "뮤지컬", color: "#a370d8" },
  연극: { label: "연극", color: "#ebcb3d" },
  페스티벌: { label: "페스티벌", color: "#4dbd79" },
  콘서트: { label: "콘서트", color: "#5e7fe2" },
};

const InterestIcon = ({ type }: InterestIconProps) => {
  const interest = interestMap[type] || { label: "기타", color: "#ccc" };

  return (
    <span
      className="px-4 h-7 rounded-[140px] text-white text-sm font-semibold flex items-center justify-center"
      style={{ backgroundColor: interest.color }}
    >
      {interest.label}
    </span>
  );
};

export default InterestIcon;
