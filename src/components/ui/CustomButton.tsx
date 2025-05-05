import { twMerge } from "tailwind-merge";

interface CustomButtonProps {
  text: string;
  bgColor: string;
  borderColor?: string;
  iconSrc?: string;
  onClick?: () => void;
  customStyle?: string;
}

const CustomButton = ({
  text,
  bgColor,
  borderColor,
  iconSrc,
  onClick,
  customStyle = "",
}: CustomButtonProps) => {
  return (
    <button
      className={twMerge(`
    w-full max-w-[500px] h-[50px]
    flex items-center justify-center gap-2
    text-blue-1 body-l-r
    ${bgColor} rounded-[8px]
    ${borderColor ? `border ${borderColor}` : ""}
    hover:text-base-1 hover:bg-blue-4
    transition
    ${customStyle}
  `)}
      onClick={onClick}
    >
      {iconSrc && <img src={iconSrc} alt={text} className="w-6 h-6" />}
      {text}
    </button>
  );
};

export default CustomButton;
