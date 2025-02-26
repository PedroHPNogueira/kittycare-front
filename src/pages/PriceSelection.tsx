import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PriceSelectBox from '../components/Payments/PriceSelectBox';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { changeMethod, removePlanAsync } from '../Redux/features/billingSlice';
import { selectBilling } from '../Redux/features/billingSlice';
import Layout from '../components/Layout';
// Constants
const SUBSCRIPTION_STORAGE_KEY = 'subscriptionId';
const ROUTES = {
  CAT_ASSISTANT: '/cat-assistant',
  PAYMENT_METHOD: '/paymentmethod',
} as const;

// Types
interface PriceSelectionProps {
  className?: string;
}

const PriceSelection: React.FC<PriceSelectionProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const billingOption = useAppSelector(selectBilling);

  useEffect(() => {
    handleSubscriptionCheck();
    handlePlanSelectionFromURL();
  }, [dispatch, navigate]);

  useEffect(() => {
    navigate(ROUTES.PAYMENT_METHOD);
  }, []);

  const handleSubscriptionCheck = () => {
    const subscriptionId = localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
    if (subscriptionId) {
      navigate(ROUTES.CAT_ASSISTANT);
    }
  };

  const handlePlanSelectionFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const planSelection = urlParams.get('planSelection');

    if (planSelection) {
      navigate(ROUTES.PAYMENT_METHOD);
    }
  };

  const handleSubmit = () => {
    navigate(ROUTES.PAYMENT_METHOD);
  };

  const handleBillingMethodChange = (value: boolean) => {
    dispatch(changeMethod({ method: value }));
  };

  const handleCancel = () => {
    dispatch(removePlanAsync());
  };

  const subscriptionText = `After your free trial, the ${
    billingOption.method ? 'annual' : 'monthly'
  } subscription is $${
    billingOption.method ? billingOption.yearly : billingOption.monthly
  } USD and automatically renews each ${billingOption.method ? 'year' : 'month'}.`;

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="m-auto flex w-[90%] flex-col gap-10">
          {/* Header Section */}
          <section className="text-center">
            <p className="text-[16px] font-semibold opacity-60 sm:text-[18px]">
              Your Cat's Wellness, Purrfected.
            </p>
            <h1 className="text-[30px] font-semibold capitalize sm:text-[40px]">
              Care For Your Cat, Care For Yourself
            </h1>
            <p className="m-auto text-[16px] font-medium opacity-60 sm:text-[18px]">
              Simplify cat care, reduce stress, and enjoy a <br />
              happier bond with KittyCare
            </p>
          </section>

          {/* Pricing Options Section */}
          <section className="flex w-full flex-col gap-8">
            <div className="m-auto flex w-full flex-col gap-8 sm:w-[1000px] sm:flex-row">
              <div
                className="w-full"
                onClick={() => handleBillingMethodChange(true)}
              >
                <PriceSelectBox
                  checked={billingOption.method}
                  method={false}
                  isBest={true}
                  annual={billingOption.yearly}
                  daily={billingOption.daily}
                />
              </div>
              <div
                className="w-full"
                onClick={() => handleBillingMethodChange(false)}
              >
                <PriceSelectBox
                  checked={!billingOption.method}
                  method={false}
                  isBest={false}
                  monthly={billingOption.monthly}
                />
              </div>
            </div>

            {/* Subscription Details */}
            <div className="flex flex-col gap-2">
              <p className="text-center text-[14px] font-semibold sm:text-[18px]">
                {subscriptionText}
              </p>
              <div className="text-center text-[16px] font-semibold text-[#0061EF] sm:text-[18px]">
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
                <span className="mx-2 hidden sm:inline">-</span>
                <button
                  onClick={handleCancel}
                  className="mx-auto block hover:underline sm:inline"
                >
                  Cancel Anytime
                </button>
              </div>
            </div>
          </section>

          {/* CTA Button */}
          <div className="w-full">
            <button
              className="m-auto flex h-[55px] w-full items-center justify-center rounded-[8px] bg-[#0061EF] px-[42px] py-[14px] text-[18px] font-semibold capitalize text-[#FAF6F3] transition-colors hover:bg-[#0052CC] sm:w-auto sm:rounded-[20px]"
              onClick={handleSubmit}
            >
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PriceSelection;
