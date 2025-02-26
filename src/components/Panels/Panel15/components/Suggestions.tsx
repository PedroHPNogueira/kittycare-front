import React from 'react';
import Tip from '../../Tip';

const Suggestions: React.FC<{ horizontal?: boolean }> = ({
  horizontal = false,
}) => {
  const foodBowls = JSON.parse(localStorage.getItem('food_bowls') || '0');
  const treats = JSON.parse(localStorage.getItem('treats') || '0');
  const playtime = JSON.parse(localStorage.getItem('playtime') || '0');

  return (
    <div
      className={`w-full ${horizontal ? 'mt-4' : 'max-w-lg'} mx-auto rounded-lg p-6 font-inter`}
    >
      <h2 className="mb-4 text-center text-[20px] font-semibold">
        Suggestions
      </h2>

      <div
        className={`flex gap-4 ${horizontal ? 'flex-col gap-20 md:flex-row md:justify-center' : 'flex-col'} items-center`}
      >
        {/* Food Intake Group */}
        <div
          className={`flex ${horizontal ? 'h-full max-w-[318px] flex-col' : 'flex-col'} gap-2`}
        >
          <div className="flex flex-col items-center rounded-3xl border-2 border-pearlBush bg-lightPearl px-16 py-8">
            <div className="mb-6 rounded-xl bg-lightGray px-4 py-2 text-center">
              <h1 className="font-inter text-base font-semibold leading-[28px] text-black">
                Daily Food Intake
              </h1>
            </div>
            <div className="mb-6 flex flex-col items-center justify-center">
              <img
                src="/assets/FoodIntake.png"
                alt="Food Intake Suggestion"
                className="h-32 w-32 object-contain"
              />
            </div>
            <p className="mb-6 mt-2 text-center font-inter text-[16px] font-medium text-black">
              We{' '}
              <span className="rounded-full bg-primaryBlue px-3 py-1 text-xs font-bold text-white">
                Recommended
              </span>{' '}
              {foodBowls} {foodBowls === '1' ? 'cup' : 'cups'} of food per day
              based on your cat’s current weight and target weight.
            </p>
            <div className="flex w-full items-center px-6">
              <span className="text-sm font-medium text-black">1</span>
              <input
                type="range"
                min="1"
                max="3"
                value={parseFloat(foodBowls)}
                readOnly
                className="mx-2 h-2 flex-grow cursor-pointer appearance-none rounded-full bg-gray-300 accent-[#F4A623]"
              />
              <span className="text-sm font-medium text-black">3</span>
            </div>
            <div className="mt-1 flex w-full justify-between px-6">
              <span className="h-2 w-2 rounded-full bg-black"></span>
              <span className="h-2 w-2 rounded-full bg-black"></span>
            </div>
          </div>
          <Tip text="Reducing your cat's daily intake will help with their weight loss goal." />
        </div>

        {/* Treat Limitation Group */}
        <div
          className={`flex ${horizontal ? 'h-full max-w-[318px] flex-col' : 'flex-col'} gap-2`}
        >
          <div className="flex flex-col items-center rounded-3xl border-2 border-pearlBush bg-lightPearl px-16 py-8">
            <div className="mb-6 rounded-xl bg-lightGray px-4 py-2 text-center">
              <h1 className="font-inter text-base font-semibold leading-[28px] text-black">
                Treat Limitation
              </h1>
            </div>
            <div className="mb-6 flex flex-col items-center justify-center">
              <img
                src="/assets/TreatLimitation.png"
                alt="Treat Limitation"
                className="h-32 w-32 object-contain"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-inter text-base font-semibold leading-[28px] text-black">
                {treats} {parseFloat(treats) === 1 ? 'Treat' : 'Treats'}/Day
              </h1>
              <p className="text-center font-inter text-sm font-medium text-black">
                No more than {treats}{' '}
                {parseFloat(treats) === 1 ? 'treat' : 'treats'} per day to help
                manage weight.
              </p>
            </div>
          </div>
          <Tip text="Reducing treats will support your cat's weight management." />
        </div>

        {/* Playtime Group */}
        <div
          className={`flex ${horizontal ? 'h-full max-w-[318px] flex-col' : 'flex-col'} gap-2`}
        >
          <div className="flex flex-col items-center rounded-3xl border-2 border-pearlBush bg-lightPearl px-8 py-8">
            <div className="mb-6 rounded-xl bg-lightGray px-4 py-2 text-center">
              <h1 className="font-inter text-base font-semibold leading-[28px] text-black">
                Playtime Recommendations
              </h1>
            </div>
            <div className="mb-6 flex flex-col items-center justify-center">
              <img
                src="/assets/PlayTime.png"
                alt="Treat Limitation"
                className="h-32 w-32 object-contain"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-inter text-base font-semibold leading-[28px] text-black">
                {playtime} Minute Segments
              </h1>
              <p className="text-center font-inter text-sm font-thin text-black">
                We suggest {playtime} minutes of active play per day to improve
                your cat’s lifestyle.
              </p>
              <h1 className="m-3 font-inter text-sm font-bold">
                Some Examples Could Be
              </h1>
              <div className="flex items-center justify-evenly gap-x-3">
                <div className="flex flex-col items-center justify-center gap-0 lg:flex-row lg:gap-2">
                  <img
                    src="/assets/LaserPointerPlay.png"
                    alt="Laser Pointer Play"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-sm">Laser pointer play</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-0 lg:flex-row lg:gap-2">
                  <img
                    src="/assets/ToyWand.png"
                    alt="Toy Wand"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-sm">Toy wand exercise</span>
                </div>
              </div>
            </div>
          </div>
          <Tip text="Increased playtime will also help reduce scratching behavior." />
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
