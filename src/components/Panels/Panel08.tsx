import React from 'react';
import GoalCard from './components/GoalCard';
import { useGoals } from './hooks/useGoals';
import { GOALS } from './constants/goals';
import NavigationButtons from '../NavigationButtons';

interface Panel08Props {
  nextStep: () => void;
  previousStep: () => void;
}

/**
 * Panel02 Component
 * Allows users to select up to three goals for their cat's improvement
 */
const Panel08: React.FC<Panel08Props> = ({ nextStep, previousStep }) => {
  const { selectedGoals, handleGoalSelect, handleNext } = useGoals(nextStep);

  return (
    <div className="mx-auto w-full rounded-md p-6 md:max-w-[1380px]">
      <div className="font-Inter mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">
          Let's Choose Additional Goals For Your Cat!
        </h1>
        <p className="text-md p-5 text-darkGray">
          Select goals to focus on for your cat's health and happiness.
        </p>
      </div>

      <div className="mx-auto mb-6 grid w-3/4 grid-cols-1 gap-4 lg:grid-cols-4">
        {GOALS.map((goal) => (
          <GoalCard
            key={goal.title}
            goal={goal}
            isSelected={selectedGoals.includes(goal.title)}
            onSelect={handleGoalSelect}
          />
        ))}
      </div>
      <NavigationButtons
        nextStep={handleNext}
        previousStep={previousStep}
        isNextDisabled={selectedGoals.length === 0}
      />
    </div>
  );
};

export default Panel08;
