import React from 'react';
import { ActivityLevel } from '../constants/panel09Data';

interface ActivityCardProps {
  level: ActivityLevel;
  isSelected: boolean;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  level,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex w-full cursor-pointer items-start space-x-4 rounded-2xl border-2 p-2 transition-colors sm:p-4 ${
        isSelected
          ? 'border-primaryBlue bg-primaryBlue text-white'
          : 'border-gray-300 bg-white'
      }`}
    >
      <img
        src={level.image}
        alt={level.title}
        className="h-20 w-20 md:h-24 md:w-24"
      />
      <div className="flex flex-col items-start justify-center space-y-2">
        <h3
          className={`font-medium ${isSelected ? 'text-white' : 'text-black'} text-base lg:text-xl`}
        >
          {level.title}
        </h3>
        <p
          className={`${
            isSelected ? 'text-white opacity-80' : 'text-darkGray'
          } text-xs font-extralight md:text-sm`}
        >
          {level.description}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
