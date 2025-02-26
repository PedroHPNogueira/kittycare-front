const SubscribeBtn = ({
  payBy,
  onClick,
}: {
  payBy: string;
  onClick: () => void;
}) => {
  return (
    <div className="h-[52px] w-full">
      <button
        className="h-[55px] w-full rounded-2xl border-2 bg-blue-600 text-base text-white hover:bg-blue-700 focus:outline-none active:bg-blue-800 sm:text-xl"
        type="submit"
        onClick={onClick}
      >
        <div className="flex items-center justify-center gap-2">
          <span>Subscribe With</span>
          <span>
            <img src={`/assets/svg/${payBy}2.svg`} alt={payBy} />
          </span>
          <span>Pay</span>
        </div>
      </button>
    </div>
  );
};

export default SubscribeBtn;
