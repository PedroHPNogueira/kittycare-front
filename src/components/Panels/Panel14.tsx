import React, { useEffect } from 'react';
import { Panel14Props, OverviewSectionProps } from './types/panel.types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Suggestions from './Panel15/components/Suggestions';
import { useNavigate } from 'react-router-dom';
const LOCAL_STORAGE_KEYS = {
  GOALS: 'goals',
  ISSUES_FACED: 'issues_faced',
  REQUIRED_PROGRESS: 'required_progress',
} as const;

const OverviewSection: React.FC<OverviewSectionProps> = ({ title, items }) => {
  if (!items || (Array.isArray(items) && items.length === 0)) return null;

  return (
    <div className="mb-4 mt-3 flex flex-col items-center justify-center space-y-2 md:mt-5 md:flex-row md:items-start md:space-y-0">
      <h3 className="w-fit rounded-2xl bg-primaryYellow px-3 py-2 text-left font-medium text-black md:mr-3 md:w-auto">
        {title}
      </h3>
      <div className="flex flex-wrap justify-center gap-2 md:justify-start">
        {Array.isArray(items) ? (
          items.map((item, idx) => (
            <span
              key={idx}
              className="rounded-full border border-black bg-white px-5 py-3 text-sm text-black"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="rounded-full border border-black bg-white px-5 py-3 text-sm text-black">
            {items}
          </span>
        )}
      </div>
    </div>
  );
};

const Panel14: React.FC<Panel14Props> = ({ openPaymentModal }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const subscriptionId = localStorage.getItem('subscriptionId');
    if (!subscriptionId) openPaymentModal();
  });

  const [selectedGoals] = useLocalStorage<string[] | string>(
    LOCAL_STORAGE_KEYS.GOALS,
    [],
  );
  const [keyBarriers] = useLocalStorage<string[] | string>(
    LOCAL_STORAGE_KEYS.ISSUES_FACED,
    [],
  );
  const [progressFocus] = useLocalStorage<string[] | string>(
    LOCAL_STORAGE_KEYS.REQUIRED_PROGRESS,
    '',
  );

  return (
    <div className="mx-auto w-full rounded-md p-6 md:max-w-[1380px]">
      <div className="mb-6 text-center lg:mb-8">
        <h1 className="mx-8 mb-2 text-xl font-bold md:mx-40 md:text-2xl lg:mx-80 lg:text-3xl">
          Thanks for Subscribing!
        </h1>
      </div>

      <div className="my-8 flex justify-center gap-2">
        <button
          onClick={() => {
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

      <div className="relative mx-4 rounded-3xl border-2 border-lightGray bg-lightWhite p-6 text-center md:mx-8 lg:mx-28">
        <div className="absolute right-1/2 top-0 mb-4 flex translate-x-1/2 transform justify-center">
          <span className="rounded-bl-2xl rounded-br-2xl border border-mediumGray bg-primaryOrange px-4 py-1 text-center text-sm font-semibold text-black md:text-lg">
            Overview
          </span>
        </div>

        <OverviewSection title="Selected Goals" items={selectedGoals} />
        <OverviewSection title="Key Barriers Identified" items={keyBarriers} />
        <OverviewSection title="Progress Focus" items={progressFocus} />
      </div>

      <Suggestions horizontal />
    </div>
  );
};

export default Panel14;
