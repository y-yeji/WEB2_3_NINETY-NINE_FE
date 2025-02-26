import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "../../assets/icons/Icon";

interface InputFieldProps {
  label?: string;
  name?: string;
  type?: string;
  placeholder: string;
  errorMessage?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customStyle?: string;
}

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  errorMessage,
  value,
  onChange,
  customStyle = "",
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-[500px]">
      {label && (
        <label htmlFor={name} className="block pl-2 text-blue-1 body-l-r mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={twMerge(
            `w-[500px] h-[50px] px-4 pr-10 border border-blue-7 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-blue-1 text-body-s-r placeholder-gray-30 ${customStyle}`
          )}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? "Eye" : "EyeOff"} />
          </button>
        )}
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-1 pl-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
