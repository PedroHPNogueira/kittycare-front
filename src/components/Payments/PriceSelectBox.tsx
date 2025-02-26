import { PriceSelectBoxProps } from '../../utils/types';

const PriceSelectBox = ({
  checked,
  method,
  annual,
  monthly,
  daily,
  isBest,
}: PriceSelectBoxProps) => {
  return (
    <div
      className={`relative h-[200px] w-full rounded-[14px] border-[1.5px] border-[#B8B8B8] px-8 py-[70px] sm:h-[280px] sm:rounded-[20px] sm:border-2 sm:py-[95px] ${
        checked ? 'bg-[#FFCE01]' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div>
            <div className="self-stretch text-[22px] font-bold sm:text-[32px]">
              {method ? 'Annual' : 'Monthly'} -{' '}
              <span className="text-[#0061EF]">
                {method ? '7' : '3'} Days Free
              </span>
            </div>
          </div>
          <div>
            {annual && (
              <div className="self-stretch text-[18px] font-semibold sm:text-[24px]">
                ${annual} USD/Year
              </div>
            )}
            {monthly && (
              <div className="self-stretch text-[18px] font-semibold sm:text-[24px]">
                ${monthly} USD/Month
              </div>
            )}
            {daily && (
              <div className="self-stretch text-[18px] font-semibold sm:text-[24px]">
                ${daily} USD/Day
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex h-[48px] w-[48px] items-center rounded-2xl">
            <img
              className="h-full w-full"
              src={
                checked
                  ? '/assets/svg/checked.svg'
                  : '/assets/svg/unchecked.svg'
              }
            />
          </div>
        </div>
      </div>
      {isBest && (
        <span className="absolute left-[10%] top-[-20px] rounded-[7.2px] bg-[#0061EF] px-[21px] py-[7px] text-center text-[14px] font-semibold text-[#FAF6F3] sm:rounded-[10px] sm:text-[18px]">
          Best Value
        </span>
      )}
    </div>
  );
};

export default PriceSelectBox;
