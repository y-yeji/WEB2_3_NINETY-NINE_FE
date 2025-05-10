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
      className={`sm:w-[120px] sm:h-[40px] max-xm:w-[68px] max-xm:h-[30px] max-xm:py-[5px] max-xm:px-[10px] xm:w-[68px] xm:h-[30px] xm:py-[5px] xm:px-[10px] sm:py-[9.5px] sm:px-8 flex items-center justify-center text-${textColor} body-small-r bg-${bgColor} border border-blue-1 rounded
                      hover:bg-${hoverColor} transition `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ShortButton;
