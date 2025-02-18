interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  errorMessage?: string;
}

const InputField = ({
  label,
  name,
  placeholder,
  errorMessage,
}: InputFieldProps) => {
  return (
    <div className="w-[500px] ">
      <label
        htmlFor={name}
        className="block pl-2 text-blue-1 body-l-r mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        className="w-[500px] h-[50px] px-4 border border-blue-7 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-blue-1 text-body-s-r placeholder-gray-30"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1 pl-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
