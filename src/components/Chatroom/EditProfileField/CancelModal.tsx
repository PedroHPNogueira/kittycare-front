import React from 'react';
import TopCorner from '/assets/svg/TopCorner.svg';
import BottomCorner from '/assets/svg/BottomCorner.svg';
import { useAppDispatch } from '../../../Redux/hooks';
import { deleteSubscriptionAsync } from '../../../Redux/features/subscriptionSlice';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../../store/ui/actions';

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CancelModal: React.FC<CancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    dispatch(setLoading(true));

    try {
      await dispatch(deleteSubscriptionAsync()).unwrap();
      onConfirm();
      navigate('/progress');
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      // Optionally handle error (show error message, etc.)
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-1 py-2 sm:items-center">
      <div className="z-50">
        <div className="fixed right-0 top-0 -z-50 flex h-screen w-screen flex-col justify-between bg-[#FAF6F3]">
          <div className="top-0 flex justify-end">
            <div className="h-1/4 w-1/4 sm:w-auto">
              <img src={TopCorner} alt="TopCorner" />
            </div>
          </div>
          <div className="flex items-end justify-end">
            <div className="w-1/3 sm:w-auto">
              <img src={BottomCorner} alt="BottomCorner" />
            </div>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#FAF6F3] transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 flex w-[95%] flex-col items-center justify-center rounded-[20px] border border-[#DBCEC4] bg-[#F3EDE8] p-2 pt-[30px] text-center sm:w-[520px] sm:rounded-[50px] sm:border-2">
        <div className="absolute left-1/2 top-0 flex h-[57px] w-[57px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] border-[2.5px] border-[#5E4D3F] border-opacity-10 bg-[#FFCE01] text-[36px] font-bold sm:h-[76px] sm:w-[76px] sm:text-[48px]">
          !
        </div>
        <h2 className="mt-[20px] text-xl font-bold text-gray-900 sm:mt-[40px] sm:font-semibold">
          Cancel Subscription?
        </h2>

        <p className="mt-4 w-[280px] text-base font-medium text-[#404040] sm:mt-6 sm:w-[396px] sm:text-[20px]">
          Are you sure you want to cancel your subscription? We'll miss you!
        </p>

        <div className="mt-[20px] flex w-full flex-col justify-end gap-[10px] sm:mb-8 sm:mt-9 sm:w-auto sm:flex-row">
          <button
            onClick={handleConfirm}
            className="flex w-full items-center justify-center rounded-[20px] bg-[#0061EF] px-[42px] py-[14px] font-semibold text-white hover:bg-[#0061EF]/80 active:bg-[#0061EF]/60 sm:w-auto"
          >
            Yes, Cancel
          </button>
          <button
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-[20px] border border-[#898B90] px-[42px] py-[14px] font-semibold text-[#898B90] hover:bg-[#dddddd]/70 active:bg-[#cccccc] sm:w-auto"
          >
            Keep Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
