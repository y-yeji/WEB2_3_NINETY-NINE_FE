import React, { useState, useEffect, useRef } from "react";
import Icon from "../../assets/icons/Icon";

interface DropdownProps {
  data: string[];
  onSelect?: (selected: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ data, onSelect }) => {
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
      className="relative w-[172px] h-[40px] p-2 border border-blue-7 rounded-md bg-white cursor-pointer"
      onClick={() => setShowOptions((prev) => !prev)}
      ref={selectRef}
    >
      <label className="body-small-r ml-6">{currentValue}</label>

      <span className="absolute top-2 right-3 text-blue-7 text-lg">
        <Icon
          name="ChevronDown"
          size={24}
          strokeWidth={2}
          className="text-blue-7"
        />
      </span>

      {showOptions && (
        <ul className="absolute left-0 top-10 w-full bg-white border border-blue-7 rounded-md max-h-40 overflow-y-auto shadow-lg z-10 custom-scrollbar">
          {data.map((item, index) => (
            <li
              key={index}
              data-value={item}
              onClick={handleOnChangeSelectValue}
              className="p-2 body-small-r ml-6 hover:text-blue-4 transition cursor-pointer"
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
