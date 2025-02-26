import React from 'react';

interface TipProps {
  text: string;
}

const Tip: React.FC<TipProps> = ({ text }) => {
  return (
    <div className="flex items-center rounded-[20px] bg-pearlBush px-4 py-2">
      <img
        src="/assets/tip.png"
        alt="Tip icon"
        className="mr-3 h-10 w-10 object-cover"
      />
      <p className="text-left font-inter text-[14px] font-medium text-black">
        <span className="font-inter font-semibold">Tips: </span>
        {text}
      </p>
    </div>
  );
};

export default Tip;
