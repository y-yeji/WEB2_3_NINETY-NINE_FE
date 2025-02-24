import { twMerge } from "tailwind-merge";

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
  return (
    <div className="w-[500px]">
      {label && (
        <label htmlFor={name} className="block pl-2 text-blue-1 body-l-r mb-2">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type} 
        placeholder={placeholder}
        value={value} 
        onChange={onChange} 
        className={twMerge(
          `w-[500px] h-[50px] px-4 border border-blue-7 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-blue-1 text-body-s-r placeholder-gray-30 ${customStyle}`
        )}
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1 pl-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
