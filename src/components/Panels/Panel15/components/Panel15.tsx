import React from 'react';
import { useNavigate } from 'react-router-dom';

// Component imports
import {
  Suggestions,
  Timeline,
  DateSelection,
  EnvironmentalEnrichmentSuggestions,
  GoalSummary,
} from '.';

// Types
import { Panel15Props } from '../../../../types/panel.types';

/**
 * Panel15 Component
 * Displays the cat's personalized plan and insights including goals, suggestions,
 * timeline, and environmental enrichment recommendations
 */
const Panel15: React.FC<Panel15Props> = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/cat-assistant');
  };

  return (
    <article className="mx-auto w-full p-4 font-inter lg:max-w-4xl lg:p-6">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-bold lg:text-3xl">
          Your Cat's Personalized Plan & Insights Let's Keep Your Cat Healthy
          and Happy!
        </h1>
        <p className="lg:text-md mx-auto max-w-2xl text-sm text-darkGray">
          Here's your cat's custom care plan based on everything you've told us.
          We've tailored this to help you and your cat reach your goals. Let's
          dive into the details!
        </p>
      </header>

      {/* Main Content Section */}
      <main className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:space-x-8">
        {/* Left Column */}
        <section className="mb-8 flex w-full flex-col items-center space-y-8 lg:mb-0 lg:w-1/2 lg:items-start">
          <GoalSummary />
          <Suggestions />
        </section>

        {/* Right Column */}
        <section className="flex w-full flex-col items-center space-y-8 lg:w-1/2 lg:items-start">
          <Timeline />
          <DateSelection />
          <EnvironmentalEnrichmentSuggestions />
        </section>
      </main>

      {/* Footer Action */}
      <footer className="mt-8 flex justify-center">
        <button
          onClick={handleExploreClick}
          className="rounded-2xl bg-primaryBlue px-6 py-2 text-base text-white hover:bg-opacity-90 lg:text-lg"
          aria-label="Explore my cat care plan"
        >
          Explore My Plan
        </button>
      </footer>
    </article>
  );
};

export default Panel15;
