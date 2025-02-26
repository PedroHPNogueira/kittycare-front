import React from 'react';
import { FrequencyOption } from '../types';

interface FrequencyCardProps {
  option: FrequencyOption;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export const FrequencyCard: React.FC<FrequencyCardProps> = ({
  option,
  isSelected,
  onSelect,
}) => (
  <div
    role="radio"
    aria-checked={isSelected}
    tabIndex={0}
    onClick={() => onSelect(option.id)}
    onKeyPress={(e) => e.key === 'Enter' && onSelect(option.id)}
    className={`cursor-pointer rounded-2xl border-2 p-4 text-left transition-all duration-300 lg:h-20 lg:px-6 lg:py-2 ${
      isSelected ? 'border-primaryBlue' : 'border-lightGray2'
    }`}
  >
    <div className="flex items-center justify-between lg:space-x-4">
      <div className="flex flex-col">
        <h3
          className={`text-md font-semibold lg:text-lg ${
            isSelected ? 'text-primaryBlue' : 'text-black'
          }`}
        >
          {option.title}
          {option.isRecommended && (
            <span className="ml-2 rounded-full bg-primaryBlue px-2 py-1 text-xs text-white">
              Recommended
            </span>
          )}
        </h3>
        <p
          className={`text-sm ${isSelected ? 'text-primaryBlue' : 'text-darkGray'}`}
        >
          {option.description}
        </p>
      </div>
      <div
        className={`ml-4 flex h-6 w-6 items-center justify-center rounded-full border-2 lg:ml-auto ${
          isSelected ? 'border-primaryBlue' : 'border-lightGray2'
        }`}
      >
        {isSelected && (
          <span className="h-3 w-3 rounded-full bg-primaryYellow"></span>
        )}
      </div>
    </div>
  </div>
);
