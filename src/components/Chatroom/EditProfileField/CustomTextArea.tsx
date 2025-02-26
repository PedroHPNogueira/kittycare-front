import React from 'react';

interface CustomTextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Enter text here',
  rows = 4,
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <label className="text-xl font-medium">{label}</label>
      <div className="w-full">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full resize-none rounded-[20px] border border-[#898B90] px-4 py-[14px] text-center text-gray-900 placeholder-[#898B90] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default CustomTextArea;
