import React, { useState, useEffect, useRef } from "react";
import Icon from "../../assets/icons/Icon";

interface DropdownProps {
  data: string[];
  onSelect?: (selected: string) => void;
  sizeClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  data,
  onSelect,
  sizeClassName = "",
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useState<string>(data[0]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleOnChangeSelectValue = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.dataset.value;
    if (value) {
      setCurrentValue(value);
      if (onSelect) onSelect(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative ${sizeClassName} p-[2px] border border-blue-7 rounded bg-white cursor-pointer z-10 `}
      onClick={() => setShowOptions((prev) => !prev)}
      ref={selectRef}
    >
      <label className="align-middle body-small-r ml-6">{currentValue}</label>

      <span className="absolute top-1 right-3 text-blue-7">
        <Icon
          name="ChevronDown"
          size={24}
          strokeWidth={2}
          className="text-blue-7"
        />
      </span>

      {showOptions && (
        <ul className="absolute left-0 top-[30px] w-full bg-white border border-blue-7 rounded max-h-40 overflow-y-auto shadow-lg custom-scrollbar">
          {data.map((item, index) => (
            <li
              key={index}
              data-value={item}
              onClick={handleOnChangeSelectValue}
              className="p-2 body-small-r ml-4 hover:text-blue-4 transition cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
