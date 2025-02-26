import { FaAngleRight, FaCcAmex } from 'react-icons/fa';

const PayMethodBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="cursor-pointer hover:shadow-sm active:shadow-lg"
      onClick={onClick}
    >
      <div className="flex h-[55px] w-full items-center justify-between rounded-lg border border-[#898B90] pe-2 ps-5">
        <label className="w-[40%] text-center text-[16px] font-semibold text-blue-500 sm:block">
          Credit or Debit Card
        </label>
        <div className="flex items-center gap-4">
          <img src="/assets/svg/visa.svg" alt="Visa" />
          <img src="/assets/svg/master.svg" alt="Mastercard" />
          <FaCcAmex className="text-3xl text-blue-400" />
        </div>
        <button className="text-2xl text-blue-500">
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default PayMethodBtn;
