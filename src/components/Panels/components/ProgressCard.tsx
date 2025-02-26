import React from 'react';
import { ProgressItem } from '../constants/progressItems';

interface ProgressCardProps {
  item: ProgressItem;
  isSelected: boolean;
  onSelect: (title: string) => void;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  item,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(item.title)}
      className={`flex h-28 w-full items-center justify-start rounded-2xl border-2 px-4 text-left transition-all duration-300 sm:px-8 md:h-24 md:px-4 md:py-3 lg:py-5 ${
        isSelected ? 'bg-primaryBlue text-white' : 'border-gray-300'
      }`}
      aria-pressed={isSelected}
    >
      <div className="flex flex-col items-start justify-center space-y-2">
        <h3
          className={`text-md font-semibold ${isSelected ? 'text-white' : 'text-black'}`}
        >
          {item.title}
        </h3>
        <p className={`text-xs ${isSelected ? 'text-white' : 'text-darkGray'}`}>
          {item.description}
        </p>
      </div>
    </button>
  );
};
