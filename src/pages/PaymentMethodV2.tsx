import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../Redux/hooks';
import PayMethodBtn from '../components/Payments/PayMethodBtn';
import Layout from '../components/Layout';
import ReactPixel from 'react-facebook-pixel';
import { useMediaQuery } from 'react-responsive';
import { updateBillingOption } from '../Redux/features/billingSlice';
// import PayPalSubscriptionBtn from "../components/Payments/PayPalSubscriptionBtn";

/**
 * PaymentMethodV2 component handles the payment method selection page
 * Displays pricing information and available payment options
 */
const PaymentMethodV2 = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const dispatch = useAppDispatch();

  // Check for existing subscription and redirect if found
  useEffect(() => {
    const subscriptionId = localStorage.getItem('subscriptionId');
    if (subscriptionId) {
      navigate('/cat-assistant');
    }

    // Track InitiateCheckout when payment method page loads
    ReactPixel.track('InitiateCheckout');
  }, [navigate]);

  useEffect(() => {
    if (isMobile) {
      dispatch(updateBillingOption({ method: false }));
    }
  }, [isMobile, dispatch]);

  return (
    <Layout>
      <div className="w-full">
        {/* Payment Options Section */}
        <div className="my-2 sm:m-0">
          <div className="mb-8 flex flex-col gap-2 text-center">
            <h1 className="font-inter text-[24px] font-bold capitalize text-black [leading-trim:both] [text-edge:cap] sm:text-[38px]">
              Start Your Free Trial
            </h1>
            <p className="text-center font-inter text-[18px] font-medium leading-[1.3] text-[#404040] [leading-trim:both] [text-edge:cap] sm:text-[22px]">
              Begin speaking with an expert to discuss your cat's personalized
              plan.
            </p>
          </div>
          <div className="mx-auto h-auto w-[343px] rounded-3xl border-2 border-[#B8B8B8] bg-white px-[21px] py-[47px] sm:w-[608px] sm:px-[85px] sm:py-[80px]">
            <div className="flex h-full w-full flex-col items-center justify-between">
              <div className="text-center">
                <h2 className="mb-6 text-[22px] font-semibold sm:text-[36px]">
                  3-Day Access for $0
                </h2>
                <div className="mb-4 text-base font-medium sm:text-lg">
                  Unlock all the exclusive features of KittyCare{' '}
                  <b>at zero cost</b> to you for the first three days. $49.99
                  per month once your trial has expired.
                </div>
              </div>

              {/* Payment Methods Section */}
              <div className="flex h-full w-full flex-col justify-between gap-[20px]">
                <PayMethodBtn onClick={() => navigate('/paymentdetailV2')} />
                {/* <PayPalSubscriptionBtn /> */}
                {/* Footer Section */}
                <div>
                  <div className="text-center text-[14px] font-semibold opacity-60">
                    Applicable VAT, sales or other applicable taxes may apply.
                    Cancel anytime.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentMethodV2;
