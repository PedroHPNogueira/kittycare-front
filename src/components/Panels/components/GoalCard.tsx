import React from 'react';
import { Goal } from '../../../utils/types';

interface GoalCardProps {
  goal: Goal;
  isSelected: boolean;
  onSelect: (title: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(goal.title)}
      className={`cursor-pointer rounded-lg border-2 border-lightGray2 px-6 py-8 text-left transition-colors ${
        isSelected
          ? 'bg-primaryBlue text-white'
          : 'border-gray-300 hover:bg-primaryBlue hover:text-white'
      }`}
    >
      <h3 className="mb-1.5 text-lg">{goal.title}</h3>
      <p className="text-sm opacity-80">{goal.description}</p>
    </div>
  );
};

export default GoalCard;
