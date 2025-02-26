import React from 'react';

interface Panel01Props {
  nextStep: () => void;
}

/**
 * Welcome panel displayed after user subscription
 * Shows feature highlights and prompts user to start the onboarding process
 */
const Panel01: React.FC<Panel01Props> = ({ nextStep }) => {
  return (
    <div className="globalBackground relative flex flex-col items-center justify-start px-4 py-2 md:p-4">
      <div className="mx-auto w-full max-w-4xl">
        {/* Welcome Message */}
        <header className="mx-auto flex w-full max-w-md flex-col items-center justify-center text-center md:mt-8">
          <h1 className="font-inter text-2xl font-bold text-black md:text-3xl">
            Does Your Cat Need Help? 🐾
            <br />
            Take Our 2-Minute Quiz
          </h1>
          <p className="text-md px-3 py-2 font-light text-darkGray sm:px-5 sm:py-3 md:text-lg">
            Get instant insights into your cat’s health and start chatting with
            an expert in minutes. Tailored advice, personalized to your cat’s
            needs.
          </p>
        </header>

        {/* Action Button */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <button
            onClick={nextStep}
            className="rounded-2xl bg-primaryBlue px-6 py-2 text-2xl text-white transition-opacity hover:bg-opacity-90 sm:px-8 sm:py-3 md:text-3xl"
            aria-label="Start onboarding process"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panel01;
