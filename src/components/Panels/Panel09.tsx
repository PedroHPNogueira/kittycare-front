import React, { useState, useEffect } from 'react';
import NavigationButtons from '../NavigationButtons';
import ActivityCard from './components/ActivityCard';
import { ACTIVITY_LEVELS, STORAGE_KEY } from './constants/panel09Data';

interface Panel09Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel09: React.FC<Panel09Props> = ({ nextStep, previousStep }) => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  // Load saved activity level from localStorage
  useEffect(() => {
    const storedActivity = localStorage.getItem(STORAGE_KEY);
    if (storedActivity) {
      const activityId = ACTIVITY_LEVELS.find(
        (level) => level.title === storedActivity,
      )?.id;
      setSelectedActivity(activityId ?? null);
    }
  }, []);

  // Save selected activity level to localStorage
  useEffect(() => {
    if (selectedActivity !== null) {
      const selectedLevel = ACTIVITY_LEVELS.find(
        (level) => level.id === selectedActivity,
      );
      if (selectedLevel) {
        localStorage.setItem(STORAGE_KEY, selectedLevel.title);
      }
    }
  }, [selectedActivity]);

  return (
    <div className="mx-auto p-4 font-inter lg:p-6">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-2xl font-bold md:text-3xl">
          What's Your Cat's Activity Level?
        </h1>
        <p className="mx-8 px-4 text-center text-sm text-darkGray md:mx-36">
          Select the option that best describes your cat's typical energy and
          activity level.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:mx-12 md:grid-cols-2 lg:mx-36 lg:max-w-[1450px]">
        {ACTIVITY_LEVELS.map((level) => (
          <ActivityCard
            key={level.id}
            level={level}
            isSelected={selectedActivity === level.id}
            onClick={() => setSelectedActivity(level.id)}
          />
        ))}
      </div>

      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={!selectedActivity}
      />
    </div>
  );
};

export default Panel09;
