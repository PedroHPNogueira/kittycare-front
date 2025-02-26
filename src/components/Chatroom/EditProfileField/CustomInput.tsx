import React from 'react';

interface CustomInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Enter text',
  type = 'text',
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <label className="text-xl font-semibold">{label}</label>
      <div className="relative w-full">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-[55px] w-full rounded-[20px] border border-[#898B90] bg-transparent px-4 py-[14px] text-center text-gray-900 placeholder-[#898B90] focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default CustomInput;
