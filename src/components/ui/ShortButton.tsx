interface ShortButtonProps {
  text: string;
  textColor: string;
  bgColor: string;
  hoverColor?: string;
  onClick?: () => void;
}

const ShortButton = ({
  text,
  bgColor,
  textColor,
  hoverColor = "",
  onClick,
}: ShortButtonProps) => {
  return (
    <button
      className={`w-[120px] h-[40px] flex items-center justify-center text-${textColor} body-s-r bg-${bgColor} border border-blue-1 rounded-[8px] 
                      hover:bg-${hoverColor} transition `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ShortButton;
