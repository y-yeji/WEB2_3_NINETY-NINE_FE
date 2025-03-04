interface DividerWithTextProps {
  text: string;
}

const DividerWithText = ({ text }: DividerWithTextProps) => {
  return (
    <div className="flex items-center w-[500px] ">
      <hr className="flex-1 border-blue-7" />
      <span className="mx-[17px] text-blue-5 text-sm">{text}</span>
      <hr className="flex-1 border-blue-7" />
    </div>
  );
};

export default DividerWithText;
