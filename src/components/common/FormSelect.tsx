import React from 'react';

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
}) => (
  <div className="text-center">
    <label className="mb-0.5 block text-sm font-medium">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-full border border-gray-300 px-4 py-2 font-inter text-sm placeholder:text-xs placeholder:text-mediumGray focus:border-primaryBlue focus:outline-none md:placeholder:text-sm"
    >
      <option value="" disabled className="bg-lightWhite text-sm">
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option} className="bg-lightWhite text-sm">
          {option}
        </option>
      ))}
    </select>
  </div>
);
