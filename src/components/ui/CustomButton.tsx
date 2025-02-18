interface CustomButtonProps {
  text: string;
  bgColor: string;
  borderColor?: string;
  iconSrc?: string;
  onClick?: () => void;
}

const CustomButton = ({
  text,
  bgColor,
  borderColor,
  iconSrc,
  onClick,
}: CustomButtonProps) => {
  return (
    <button
      className={`w-[500px] h-[50px] flex items-center justify-center gap-2 text-blue-1 body-l-r ${bgColor} rounded-[8px] 
                    ${borderColor ? `border ${borderColor}` : ""} hover:text-base-1 hover:bg-blue-4 transition mb-7`}
      onClick={onClick}
    >
      {iconSrc && <img src={iconSrc} alt={text} className="w-6 h-6" />}
      {text}
    </button>
  );
};

export default CustomButton;
