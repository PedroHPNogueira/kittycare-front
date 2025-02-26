import React from 'react';
import Tip from '../../Tip';

interface TimelineItem {
  method: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  { method: 'Method 1', description: 'Introduce healthier feeding habits' },
  { method: 'Method 2', description: 'Notice a reduction in scratching' },
  { method: 'Method 4', description: 'Improved playtime activity' },
  { method: 'Method 6', description: 'Weight loss goal reached' },
];

const Timeline: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-lg rounded-lg p-6 font-inter">
      <h2 className="mb-4 text-center text-[20px] font-semibold">
        Timeline Overview
      </h2>

      <div className="relative flex flex-col items-center rounded-3xl border-2 border-pearlBush bg-lightPearl px-8 py-4">
        {/* Added overlay for locked state */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-3xl bg-black/20 backdrop-blur-[2px]">
          <div className="group relative cursor-pointer transition-transform duration-300 hover:scale-110">
            <div className="absolute inset-0 animate-ping rounded-full bg-pearlBush opacity-75"></div>
            <img
              src="/assets/veryInactive.png"
              alt="Cat silhouette"
              className="relative z-10 h-20 w-20"
            />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm text-gray-700 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
              More features coming soon!
            </div>
          </div>
          <p className="mt-4 text-xl font-semibold text-white">
            <span className="relative inline-block animate-bounce">
              Coming Soon!
            </span>
          </p>
        </div>

        {/* Original content with reduced opacity */}
        <div className="relative z-10">
          <div className="mb-6 rounded-xl bg-lightGray px-4 py-2 text-center">
            <h1 className="font-inter text-[20px] font-semibold leading-[28px] text-black">
              Next 6 Months
            </h1>
          </div>

          <div className="grid grid-cols-3 items-center gap-3">
            {/* Left side with Method labels */}
            <div className="flex h-full flex-col items-center justify-between space-y-10">
              {timelineItems.map((item, index) => (
                <div key={index} className="font-semibold text-black">
                  {item.method}
                </div>
              ))}
            </div>

            {/* Center Vertical Progress Bar */}
            <div className="flex h-full flex-col items-center justify-between space-y-10">
              <img
                src="/assets/VerticalProgress.png"
                alt="Vertical Progress"
                className="h-[25rem] w-8"
              />
            </div>

            {/* Right side with Descriptions */}
            <div className="flex h-full flex-col items-center justify-between space-y-10">
              {timelineItems.map((item, index) => (
                <div key={index} className="text-sm font-medium text-gray-600">
                  {item.description}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Tip text="Staying consistent will help you and your cat reach these milestones!" />
    </div>
  );
};

export default Timeline;
