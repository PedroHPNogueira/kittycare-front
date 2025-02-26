import React from 'react';

import Tip from '../../Tip';

const EnvironmentalEnrichmentSuggestions: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-lg rounded-lg p-6 font-inter">
      <h2 className="mb-4 text-center text-[20px] font-semibold">
        Environmental Enrichment Suggestions
      </h2>

      <div className="flex flex-col items-center rounded-3xl border-2 border-pearlBush bg-lightPearl px-8 py-8">
        <div className="mb-3 rounded-xl bg-lightGray px-2 py-1 text-center">
          <h1 className="font-inter text-base font-semibold leading-[28px] text-black">
            Your Cat Health & Lifestyle
          </h1>
        </div>
        <p className="mb-6 mt-2 text-center font-inter text-sm font-normal text-black">
          You own a scratching post and cat toys.
        </p>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-2">
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-44 items-center justify-center rounded-3xl border-2 border-pearlBush bg-primaryBlue py-6">
              <img
                src="/assets/Dumble.png"
                alt="no-dumble"
                className="h-30 object-contain"
              />
            </div>
            <div className="w-full rounded-xl border border-pearlBush p-3">
              <p className="text-left font-inter text-xs text-black">
                Scratching post
              </p>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="w-min rounded-md bg-primaryYellow px-2 py-1 text-sm text-black">
                    01
                  </p>
                  <span className="mt-2 text-xs text-black">Forever</span>
                </div>
                <div>
                  <span className="rounded-md bg-emerald-500 p-1 text-xs text-white">
                    +100%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-44 items-center justify-center rounded-3xl border-2 border-pearlBush bg-primaryBlue py-6">
              <img
                src="/assets/rat.png"
                alt="no-dumble"
                className="h-30 object-contain"
              />
            </div>
            <div className="w-full rounded-xl border border-pearlBush p-3">
              <p className="text-left font-inter text-xs text-black">
                You have cat toys
              </p>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="w-min rounded-md bg-primaryYellow px-2 py-1 text-sm text-black">
                    03
                  </p>
                  <span className="mt-2 text-xs text-black">Forever</span>
                </div>
                <div>
                  <span className="rounded-md bg-emerald-500 p-1 text-xs text-white">
                    +50%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tip text="Use the scratching post consistently to meet your cat’s scratching needs and protect your furniture!" />
    </div>
  );
};

export default EnvironmentalEnrichmentSuggestions;
