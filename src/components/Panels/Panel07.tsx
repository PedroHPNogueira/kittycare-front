import React, { useEffect, useState, useCallback } from 'react';
import NavigationButtons from '../NavigationButtons';
import { challengeOptions } from './constants/panel07Data';

interface Panel07Props {
  nextStep: () => void;
  previousStep: () => void;
}

const MAX_SELECTIONS = 10;
const STORAGE_KEY = 'issues_faced';

const Panel07: React.FC<Panel07Props> = ({ nextStep, previousStep }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  // Load saved goals from localStorage
  useEffect(() => {
    const storedGoals = localStorage.getItem(STORAGE_KEY);
    if (storedGoals) {
      setSelectedGoals(JSON.parse(storedGoals));
    }
  }, []);

  const handleGoalSelect = useCallback((goal: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goal)) {
        return prev.filter((g) => g !== goal);
      }
      if (prev.length < MAX_SELECTIONS) {
        return [...prev, goal];
      }
      return prev;
    });
  }, []);

  const handleNext = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedGoals));
    nextStep();
  }, [selectedGoals, nextStep]);

  const isGoalSelected = useCallback(
    (goal: string) => selectedGoals.includes(goal),
    [selectedGoals],
  );

  return (
    <div className="mx-auto w-full rounded-md p-6 md:max-w-[1380px]">
      <div className="mb-6 flex flex-col items-center justify-center text-center">
        <h2 className="mb-2 text-2xl font-bold text-black md:text-3xl">
          What's Standing in Your Way?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-darkGray">
          Select all the barriers that may be making it difficult to reach your
          cat's goals.
        </p>
      </div>
      <div className="mx-auto mb-6 grid w-3/4 grid-cols-1 gap-4 lg:grid-cols-4">
        {challengeOptions.map((goal) => (
          <div
            key={goal.title}
            onClick={() => handleGoalSelect(goal.title)}
            className={`cursor-pointer rounded-lg border-2 border-lightGray2 px-6 py-8 text-left transition-colors ${
              isGoalSelected(goal.title)
                ? 'border-none bg-primaryBlue text-white'
                : 'hover:bg-primaryBlue hover:text-white'
            }`}
          >
            <h3 className="text-md mb-1.5 md:text-lg">{goal.title}</h3>
            <p className="text-xs leading-snug opacity-80 sm:text-sm">
              {goal.description}
            </p>
          </div>
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

export default Panel07;
