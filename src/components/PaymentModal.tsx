import React, { useEffect, useState, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import ReactPixel from 'react-facebook-pixel';
import { useRive, UseRiveParameters } from '@rive-app/react-canvas';

import { useAppDispatch } from '../Redux/hooks';
import { updateBillingOption } from '../Redux/features/billingSlice';

import PayMethodBtn from './Payments/PayMethodBtn';
// import PayPalSubscriptionBtn from './Payments/PayPalSubscriptionBtn';
import PaymentDetailV2 from '../pages/PaymentDetailV2';
import styles from './LoadingOverlay/LoadingOverlay.module.css';

const RIVE_ANIMATION_CONFIG: UseRiveParameters = {
  src: 'riv/V2/Pulse_kitty.riv',
  autoplay: true,
};

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [showCardFields, setShowCardFields] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const dispatch = useAppDispatch();
  const { RiveComponent } = useRive(RIVE_ANIMATION_CONFIG);
  const isPhone = window.innerWidth < 768;

  const playMeow = useCallback(() => {
    const audio = new Audio('/assets/sounds/meow.mp3');
    audio.play().catch((error) => console.log('Audio playback failed:', error));
  }, []);

  useEffect(() => {
    if (isMobile) {
      dispatch(updateBillingOption({ method: false }));
    }
  }, [isMobile, dispatch]);

  useEffect(() => {
    const checkSubscriptionStatus = () => {
      const subscriptionId = localStorage.getItem('subscriptionId');
      const isNewSuccess = !!subscriptionId && subscriptionId !== 'null';
      if (isNewSuccess && !isSuccess) {
        playMeow();
      }
      setIsSuccess(isNewSuccess);
    };

    ReactPixel.track('InitiateCheckout');
    console.log('ReactPixel.track("InitiateCheckout");');
    checkSubscriptionStatus();

    window.addEventListener('storage', checkSubscriptionStatus);

    return () => {
      window.removeEventListener('storage', checkSubscriptionStatus);
    };
  }, [isSuccess, playMeow]);

  if (!isOpen) return null;

  const handleClose = () => {
    setShowCardFields(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`h-auto w-[380px] rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 md:w-full md:max-w-xl`}
      >
        {!isSuccess ? (
          <>
            {!showCardFields ? (
              <div className="flex h-full w-full flex-col items-center justify-between">
                <div>
                  <h2 className="mb-4 text-center text-[22px] font-semibold sm:text-[36px]">
                    Chat with an expert for <br />
                    <span className="text-[26px] text-green-600 sm:text-[40px]">
                      $0{' '}
                    </span>
                    today
                  </h2>
                  <div className="mb-4 text-center text-base font-medium sm:text-lg">
                    How your free trial works <br />3 Days free, then $49.99
                    month.
                  </div>
                  <ul className="mb-4 ml-4 flex flex-col gap-[16px] text-black">
                    <li className="flex gap-[10px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z"
                          fill="#FFCE01"
                          stroke="black"
                          strokeWidth="1.19973"
                        />
                        <path
                          d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391"
                          stroke="black"
                          strokeWidth="1.19973"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="w-[90%]">
                        <b>Today</b>
                        <br />
                        Pay{' '}
                        <span className="text-[20px] text-green-600 sm:text-[32px]">
                          $0{' '}
                        </span>{' '}
                        today and unlock unlimited access to speak with experts
                        24/7.
                      </p>
                    </li>
                    <li className="flex gap-[10px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z"
                          fill="#FFCE01"
                          stroke="black"
                          strokeWidth="1.19973"
                        />
                        <path
                          d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391"
                          stroke="black"
                          strokeWidth="1.19973"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="w-[90%]">
                        <b>Dietary Recommendations</b>
                        <br />
                        Get a personalized feeding and exercise regimen for your
                        cat.
                      </p>
                    </li>
                    <li className="flex gap-[10px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z"
                          fill="#FFCE01"
                          stroke="black"
                          strokeWidth="1.19973"
                        />
                        <path
                          d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391"
                          stroke="black"
                          strokeWidth="1.19973"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="w-[90%]">
                        <b>Cancel Anytime</b>
                        <br />
                        Pause, skip, or cancel anytime with no hassle or hidden
                        fees.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="flex h-full w-full flex-col justify-between gap-[10px]">
                  <PayMethodBtn onClick={() => setShowCardFields(true)} />
                  {/* <div className="flex items-center">
                                        <div className="flex-1 border-t border-gray-400"></div>
                                        <span className="mx-4 text-gray-500">or</span>
                                        <div className="flex-1 border-t border-gray-400"></div>
                                    </div> */}
                  {/* <PayPalSubscriptionBtn onClose={() => setIsSuccess(true)} /> */}
                  <div>
                    <div className="text-center text-[14px] font-semibold opacity-60">
                      Applicable VAT, sales or other applicable taxes may apply.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <PaymentDetailV2
                onCancel={handleClose}
                onClose={() => setIsSuccess(true)}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div
              className={`${styles.animationContainer} mx-auto h-[200px] ${isPhone ? 'hidden' : ''}`}
            >
              {RiveComponent && <RiveComponent />}
            </div>
            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-bold text-primaryBlue">
                Purr-fect! 🐱
              </h3>
              <p className="text-lg text-gray-700">
                Thank you for joining KittyCare! Your cat's wellness journey
                begins now.
              </p>
              <button
                onClick={onClose}
                className="mt-4 w-full transform rounded-xl bg-primaryBlue px-8 py-3 text-lg font-semibold text-white shadow-lg transition-colors duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl md:w-auto"
              >
                Start My Journey
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
