import React from 'react';
import Tip from '../../Tip';

const GoalSummary: React.FC = () => {
  const progressValues = [
    { label: 'Improve Lifestyle', value: 25 },
    { label: 'Scratching Less', value: 0 },
    { label: 'Lose Weight', value: 0 },
  ];

  return (
    <div className="mx-auto w-full max-w-lg rounded-lg p-6 font-inter">
      <h2 className="mb-4 text-center text-[20px] font-semibold">
        Goal Summary
      </h2>

      <div className="my-1 text-center">
        <span className="m-1 w-fit rounded-2xl bg-primaryYellow px-3 py-2 text-left font-medium text-black md:mr-3 md:w-auto">
          Selected Goals
        </span>
        {JSON.parse(localStorage.getItem('goals') || '[]').map(
          (item: string, idx: number) => (
            <span
              key={idx}
              className="m-1 inline-block rounded-full border border-mediumGray px-3 py-2 text-sm text-mediumGray"
            >
              {item}
            </span>
          ),
        )}
      </div>

      <div className="mb-2 flex flex-col items-center rounded-3xl border-2 border-pearlBush bg-lightPearl px-16 py-8">
        <div className="mb-6 rounded-xl bg-lightGray px-4 py-2 text-center">
          <h1 className="font-inter text-base font-semibold leading-[28px] text-black">
            Personalized Goals
          </h1>
        </div>
        <div className="mb-8 flex flex-col justify-center space-x-0 space-y-2 md:flex-row md:space-x-8 md:space-y-0">
          {progressValues.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-lightGray"></div>
                <div
                  className="absolute inset-0 rounded-full border-4 border-primaryBlue"
                  style={{
                    clipPath: `inset(${100 - item.value}% 0 0 0)`,
                    transform: `rotate(${item.value * 3.6}deg)`,
                    transition: 'all 0.5s ease',
                  }}
                ></div>
                <span className="text-xl font-semibold">{item.value}%</span>
              </div>
              <p className="mt-2 text-center font-semibold">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <Tip text="Tips: We’ll track progress on these goals every week!" />
    </div>
  );
};

export default GoalSummary;
