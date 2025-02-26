import { useEffect, useState } from 'react';
import SwitchMethod from '../components/Payments/SwitchMethod';
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { getCode } from 'country-list';
import { loadStripe, StripeCardNumberElement } from '@stripe/stripe-js';
import { JSX } from 'react/jsx-runtime';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../Redux/hooks';
import { RootState } from '../Redux/store';
import { getClientSecretKey } from '../services/api';
import { createSubscriptionAsync } from '../Redux/features/subscriptionSlice';
import ReactPixel from 'react-facebook-pixel';
import { setLoading } from '../store/ui/actions';
import Layout from '../components/Layout';
import { useMediaQuery } from 'react-responsive';
import { updateBillingOption } from '../Redux/features/billingSlice';
import VWORevenueTracking from '../components/VWORevenueTracking';

// Constants
const STRIPE_PROMISE = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PAYMENT_CONFIG = {
  TRIAL_DAYS: {
    MONTHLY: 3,
    YEARLY: 7,
  },
  PRICES: {
    MONTHLY: 49.99,
    YEARLY: 299.99,
  },
  CARD_ELEMENT_OPTIONS: {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Inter, "Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: window.innerWidth < 640 ? '16px' : '20px',
        lineHeight: 'normal',
        fontWeight: 500,
        '::placeholder': {
          color: '#B8B9BC',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
      complete: {
        color: '#28a745',
      },
    },
  },
};

// Types
interface PaymentFormData {
  fullName: string;
  country: string;
  state: string;
  postalCode: string;
  planName: string;
  startDate: string;
  endDate: string;
  provider: string;
  billingPeriod: string;
}

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const calculateEndDate = (isYearly: boolean): string => {
  const trialDays = isYearly
    ? PAYMENT_CONFIG.TRIAL_DAYS.YEARLY
    : PAYMENT_CONFIG.TRIAL_DAYS.MONTHLY;
  return formatDate(
    new Date(new Date().getTime() + trialDays * 24 * 60 * 60 * 1000),
  );
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const billingOption = useAppSelector((state: RootState) => state.billing);
  const userInfo = useAppSelector((state: RootState) => state.user);

  const [_subscriptionId, setSubscriptionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<PaymentFormData>({
    fullName: '',
    country: '',
    state: '',
    postalCode: '',
    planName: 'Free Trial',
    startDate: formatDate(new Date()),
    endDate: calculateEndDate(billingOption.method),
    provider: 'Stripe',
    billingPeriod: billingOption.method ? 'Yearly' : 'Monthly',
  });

  useEffect(() => {
    let subscriptionId = localStorage.getItem('subscriptionId');
    if (subscriptionId) {
      navigate('/cat-assistant');
    }
  }, [navigate]);

  useEffect(() => {
    if (isMobile) {
      dispatch(updateBillingOption({ method: false }));
    }
  }, [isMobile, dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError('Payment system not initialized');
      return;
    }

    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      const paymentMade = localStorage.getItem('paymentMade');

      if (paymentMade) {
        await dispatch(
          createSubscriptionAsync({
            id: _subscriptionId,
            email: userInfo.email || localStorage.getItem('email'),
            plan: formData.planName,
            end_date: formData.endDate,
            start_date: formData.startDate,
            provider: formData.provider,
            billing_period: formData.billingPeriod,
          }),
        ).unwrap();

        localStorage.removeItem('paymentMade');
        if (localStorage.getItem('catId')) {
          navigate('/cat-assistant');
        } else {
          navigate('/progress');
        }
        dispatch(setLoading(false));
      }

      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement) as StripeCardNumberElement,
        billing_details: {
          name: formData.fullName,
          email: userInfo.email || localStorage.getItem('email'),
          address: {
            country: getCode(formData.country),
            state: formData.state,
            postal_code: formData.postalCode,
          },
        },
      });

      ReactPixel.track('AddPaymentInfo');

      const trial_end =
        (billingOption.method ? 7 : 3) * 24 * 3600 +
        Math.floor(new Date().getTime() / 1000);
      const priceId = billingOption.method
        ? import.meta.env.VITE_STRIPE_ANNUAL_PRICE_ID
        : import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID;

      const { subscriptionId, success } = await getClientSecretKey({
        name: formData.fullName,
        email: userInfo.email || localStorage.getItem('email'),
        paymentMethodId: paymentMethod?.id,
        priceId,
        trial_end,
      });
      setSubscriptionId(subscriptionId);

      if (success) {
        localStorage.setItem('paymentMade', 'true');

        await dispatch(
          createSubscriptionAsync({
            id: subscriptionId,
            email: userInfo.email || localStorage.getItem('email'),
            plan: formData.planName,
            end_date: formData.endDate,
            start_date: formData.startDate,
            provider: formData.provider,
            billing_period: formData.billingPeriod,
          }),
        ).unwrap();

        ReactPixel.track('Purchase', {
          value: billingOption.price,
          currency: 'USD',
        });

        <VWORevenueTracking />;

        if (localStorage.getItem('catId')) {
          navigate('/cat-assistant');
        } else {
          navigate('/progress');
        }

        dispatch(setLoading(false));
      }
    } catch (error: any) {
      const errorMessage = error.message || 'An unexpected error occurred';

      if (errorMessage == 'Get client secret key failed') {
        setError('Invalid card details');
      } else {
        setError(errorMessage);
      }
      console.error('Payment processing error:', error.message);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleCancel = () => {
    navigate('/paymentmethod');
  };

  return (
    <Layout>
      <div className="m-auto flex max-w-[1200px] flex-col justify-between gap-6 sm:flex-row sm:gap-[80px]">
        {!isMobile && (
          <div className="m-auto max-w-[90%] sm:m-0 sm:w-1/2">
            <SwitchMethod />
          </div>
        )}
        <div className="m-auto w-full sm:m-0">
          <div className="m-auto h-auto max-w-[90%] rounded-3xl border-2 border-[#B8B8B8] bg-white px-[21px] py-[47px] sm:w-[610px] sm:px-[104px] sm:py-[70px]">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <div className="text-center text-[40px] font-semibold capitalize">
                  ${0} Today
                </div>
                {!isMobile && (
                  <div className="text-center text-[18px] font-medium text-black opacity-60">
                    {billingOption.method
                      ? '$0.00 for 7-day free trial; converts to $299.99 annually renewing subscription.'
                      : '$0.00 for 3-day free trial; converts to $49.99 monthly renewing subscription.'}
                  </div>
                )}
              </div>
              <div>
                <label className="mb-[10px] ms-3 block text-base font-medium text-black sm:text-[20px]">
                  Full Name on Card
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="h-[55px] w-full items-center rounded-lg border border-[#898B90] px-6 py-[14px] text-base sm:text-[20px]"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="overflow-hidden rounded-lg">
                <label className="mb-[10px] ms-3 block text-base font-medium text-black sm:text-[20px]">
                  Card Number
                </label>
                <CardNumberElement
                  className="grid h-[55px] items-center rounded-lg border border-[#898B90] px-6 py-[14px]"
                  options={PAYMENT_CONFIG.CARD_ELEMENT_OPTIONS}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-[10px] ms-3 block text-base font-medium text-black sm:text-[20px]">
                    Expiry Month
                  </label>
                  <CardExpiryElement
                    className="grid h-[55px] items-center rounded-lg border border-[#898B90] px-6 py-[14px]"
                    options={PAYMENT_CONFIG.CARD_ELEMENT_OPTIONS}
                  />
                </div>
                <div>
                  <label className="mb-[10px] ms-3 block text-base font-medium text-black sm:text-[20px]">
                    Security Code
                  </label>
                  <CardCvcElement
                    className="grid h-[55px] items-center rounded-lg border border-[#898B90] px-6 py-[14px]"
                    options={PAYMENT_CONFIG.CARD_ELEMENT_OPTIONS}
                  />
                </div>
              </div>

              <div>
                <label className="mb-[10px] ms-3 block text-base font-medium text-black sm:text-[20px]">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="h-[55px] w-full items-center rounded-lg border border-[#898B90] px-6 py-[14px] text-base sm:text-[20px]"
                  placeholder="Select country"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-[10px] ms-3 block text-base font-medium text-black sm:text-[20px]">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="h-[55px] w-full items-center rounded-lg border border-[#898B90] px-6 py-[14px] text-base sm:text-[20px]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-[10px] ms-3 block text-base font-medium text-black sm:text-[20px]">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="h-[55px] w-full items-center rounded-lg border border-[#898B90] px-6 py-[14px] text-base sm:text-[20px]"
                    required
                  />
                </div>
              </div>
              <div className="text-center text-base text-red-500">{error}</div>

              <div className="flex justify-center gap-4">
                <button
                  disabled={!stripe || isLoading}
                  className="h-[55px] w-[146px] items-center rounded-[20px] border border-[#898B90] text-center text-[18px] font-semibold text-[#898B90]"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!stripe || isLoading}
                  className="h-[55px] w-[146px] items-center rounded-[20px] border border-[#898B90] bg-[#0061EF] text-center text-[18px] font-semibold text-[#FAF6F3]"
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const PaymentDetail = (props: JSX.IntrinsicAttributes) => (
  <Elements stripe={STRIPE_PROMISE}>
    <PaymentForm {...props} />
  </Elements>
);

export default PaymentDetail;
