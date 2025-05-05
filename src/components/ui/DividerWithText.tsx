interface DividerWithTextProps {
  text: string;
}

const DividerWithText = ({ text }: DividerWithTextProps) => {
  return (
    <div className="flex items-center w-full max-w-[500px]">
      <hr className="flex-1 border-blue-7" />
      <span className="mx-4 sm:mx-[17px] text-blue-5 text-sm sm:text-base">
        {text}
      </span>
      <hr className="flex-1 border-blue-7" />
    </div>
  );
};

export default DividerWithText;
