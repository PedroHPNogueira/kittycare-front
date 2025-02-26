import React from 'react';
import Suggestions from './Panel15/components/Suggestions';
// import Timeline from "./Panel15/components/Timeline";
// import DateSelection from "./Panel15/components/DateSelection";
// import EnvironmentalEnrichmentSuggestions from "./Panel15/components/EnvironmentalEnrichmentSuggestions";
import GoalSummary from './Panel15/components/GoalSummary';
import { useNavigate } from 'react-router-dom';
import { Panel15Props } from '../../types/panel.types';

const Panel15: React.FC<Panel15Props> = ({ openPaymentModal }) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full p-4 font-inter lg:max-w-4xl lg:p-6">
      <div className="text-center">
        <h1 className="mb-2 text-xl font-bold lg:text-3xl">
          Thanks for Subscribing!
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:space-x-8">
        <div className="align-center mb-2 flex w-full flex-col items-center space-y-8 lg:mb-0 lg:w-1/2 lg:items-start">
          <GoalSummary />
        </div>
        <div className="flex w-full flex-col items-center gap-2 space-y-8 lg:w-1/2 lg:items-start">
          <Suggestions />
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <button
          onClick={() => {
            debugger;
            if (
              localStorage.getItem('email') &&
              localStorage.getItem('subscriptionId')
            ) {
              navigate('/cat-assistant');
            } else if (!localStorage.getItem('subscriptionId')) {
              openPaymentModal?.();
            } else {
              navigate('/signup');
            }
          }}
          className="rounded-2xl bg-primaryBlue px-6 py-2 text-base text-white hover:bg-opacity-90 lg:text-lg"
        >
          Chat With Expert Now
        </button>
      </div>
    </div>
  );
};

export default Panel15;
