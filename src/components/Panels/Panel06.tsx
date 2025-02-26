import React, { useState } from 'react';
import NavigationButtons from '../NavigationButtons';
import { PROGRESS_ITEMS } from './constants/progressItems';
import { ProgressCard } from './components/ProgressCard';

interface Panel06Props {
  nextStep: () => void;
  previousStep: () => void;
}

const MAX_GOALS = 10;

const Panel06: React.FC<Panel06Props> = ({ nextStep, previousStep }) => {
  const [selectedProgress, setSelectedProgress] = useState<string[]>(
    JSON.parse(localStorage.getItem('required_progress') || '[]'),
  );

  const handleCardSelect = (progress: string) => {
    setSelectedProgress((prev) => {
      if (prev.includes(progress)) {
        return prev.filter((g) => g !== progress);
      }
      if (prev.length < MAX_GOALS) {
        return [...prev, progress];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    if (selectedProgress !== null) {
      localStorage.setItem(
        'required_progress',
        JSON.stringify(selectedProgress),
      );

      nextStep();
    }
  };

  return (
    <main className="relative mx-auto w-full max-w-2xl p-6 lg:max-w-6xl">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold lg:text-3xl">
          What Progress is Most Important To You?
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-darkGray">
          Choose the most important area where you'd like to see progress for
          your cat.
        </p>
      </header>

      <section
        className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mx-12"
        role="radiogroup"
        aria-label="Progress options"
      >
        {PROGRESS_ITEMS.map((item) => (
          <ProgressCard
            key={item.id}
            item={item}
            isSelected={selectedProgress.includes(item.title)}
            onSelect={handleCardSelect}
          />
        ))}
      </section>

      <NavigationButtons
        nextStep={handleSubmit}
        previousStep={previousStep}
        isNextDisabled={selectedProgress.length === 0}
      />
    </main>
  );
};

export default Panel06;
