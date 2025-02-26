import React from 'react';
import { DaySelectionPanelProps } from './types/daySelection';
import { DAY_OPTIONS, TRAINING_DAYS_KEY } from './constants/dayOptions';
import { useDaySelection } from './hooks/useDaySelection';
import { DayCard } from './components/DayCard';
import NavigationButtons from '../NavigationButtons';

const Panel11: React.FC<DaySelectionPanelProps> = ({
  nextStep,
  previousStep,
}) => {
  const { selectedDays, handleDaySelect } = useDaySelection();

  const handleSubmit = () => {
    if (selectedDays.length > 0) {
      localStorage.setItem(TRAINING_DAYS_KEY, JSON.stringify(selectedDays));
      nextStep();
    }
  };

  return (
    <div className="mx-auto w-full rounded-md p-6 md:max-w-[1380px]">
      <div className="mb-6 text-center lg:mb-8">
        <h1 className="mx-8 mb-2 text-xl font-bold md:mx-40 lg:mx-80">
          Pick Your Best Training Days
        </h1>
        <p className="px-8 text-sm text-darkGray md:mx-36 lg:mx-72">
          Select the days when you're most likely to dedicate time to training
          your cat. We recommend picking at least 2-3 days a week for best
          results.
        </p>
      </div>

      <div className="mx-auto mb-10 grid gap-2 md:max-w-4xl md:grid-cols-2 md:gap-2">
        {DAY_OPTIONS.map((day) => (
          <DayCard
            key={day.id}
            day={day}
            isSelected={selectedDays.includes(day.day)}
            onSelect={handleDaySelect}
          />
        ))}
      </div>

      <NavigationButtons
        nextStep={handleSubmit}
        previousStep={previousStep}
        isNextDisabled={selectedDays.length === 0}
      />
    </div>
  );
};

export default Panel11;
