import React from 'react';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => (
  <div className="text-center">
    <label className="mb-0.5 block text-sm font-medium">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-full border border-gray-300 px-4 py-2 font-inter text-sm placeholder:text-xs placeholder:text-mediumGray focus:border-primaryBlue focus:outline-none md:placeholder:text-sm"
    />
  </div>
);
