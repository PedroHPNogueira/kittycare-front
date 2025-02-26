import React from 'react';
import { motion } from 'framer-motion';
import { DayOption } from '../types/daySelection';

interface DayCardProps {
  day: DayOption;
  isSelected: boolean;
  onSelect: (day: string) => void;
}

export const DayCard: React.FC<DayCardProps> = ({
  day,
  isSelected,
  onSelect,
}) => {
  return (
    <motion.div
      onClick={() => onSelect(day.day)}
      className={`cursor-pointer rounded-2xl border-2 p-4 text-left transition-all duration-300 lg:p-6 ${
        isSelected ? 'border-primaryBlue' : 'border-lightGray2'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`text-md font-semibold lg:text-lg ${
            isSelected ? 'text-primaryBlue' : 'text-black'
          }`}
        >
          {day.day}
        </h3>
        <div
          className={`ml-4 flex h-6 w-6 items-center justify-center rounded-full border-2 lg:ml-auto lg:h-6 lg:w-6 ${
            isSelected ? 'border-primaryBlue' : 'border-lightGray2'
          }`}
        >
          {isSelected && (
            <span className="h-2 w-2 rounded-full bg-primaryYellow lg:h-3 lg:w-3" />
          )}
        </div>
      </div>
    </motion.div>
  );
};
