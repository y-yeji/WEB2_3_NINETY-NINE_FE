export const TitleBar = ({ title }: { title: string }) => {
    return (
      <div className="flex flex-col items-center mt-[135px] mb-[95px]">
        <div className="w-[1000px] flex justify-center relative">
          <button className="text-center pb-5">
            <p className="h3-b text-blue-6">{title}</p>
          </button>
        </div>
        <div className="relative w-[1000px] h-[4px] bg-blue-6 flex justify-center"></div>
      </div>
    );
  };
