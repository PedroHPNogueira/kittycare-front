import React, { useEffect, useState } from 'react';
import { useRive, UseRiveParameters } from '@rive-app/react-canvas';

import { TermsCheckbox } from '../Signup';
import styles from '../../components/LoadingOverlay/LoadingOverlay.module.css';
import { useSignupForm } from '../../hooks/useSignupForm';
import { OTPForm } from '../shared/OTPForm';

interface Panel03Props {
  previousStep: () => void;
  nextStep: () => void;
}

const RIVE_ANIMATION_CONFIG: UseRiveParameters = {
  src: 'riv/V2/Pulse_kitty.riv',
  autoplay: true,
};

const Panel03: React.FC<Panel03Props> = ({ previousStep, nextStep }) => {
  const { RiveComponent } = useRive(RIVE_ANIMATION_CONFIG);

  const {
    error,
    isLoading,
    checked,
    setChecked,
    handleChange,
    handleEmailSubmit,
    handleOTPSubmit,
  } = useSignupForm();

  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOTP] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail) {
      validateEmail(newEmail);
    } else {
      setEmailError('');
    }
  };

  const onEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }
    const success = await handleEmailSubmit(email);
    if (success) {
      setShowOTPInput(true);
    }
  };

  const onOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleOTPSubmit(email, otp);
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 6 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOTP(value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) nextStep();
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          className={styles.overlay}
          role="alert"
          aria-busy="true"
          aria-label="Loading content"
        >
          <div className={styles.animationContainer}>
            {RiveComponent && <RiveComponent />}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full rounded-md p-6 md:max-w-lg">
          <header className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold lg:text-3xl">
              Tell Us About You
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-darkGray">
              Please provide some basic details about you so we can best help
              you.
            </p>
          </header>
          {!showOTPInput ? (
            <form onSubmit={onEmailSubmit}>
              <div className="flex w-full flex-col gap-6">
                <div className="flex justify-between gap-2">
                  <div className="flex flex-col gap-2">
                    <label className="ml-2 text-base font-bold sm:text-xl sm:font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      className="w-full rounded-full border border-gray-300 px-4 py-2 placeholder:text-sm focus:border-primaryBlue focus:outline-none"
                      placeholder={'First name'}
                      onChange={handleChange}
                    />
                    {error && (
                      <div
                        id={`${name}-error`}
                        className="relative -mt-[6px] ms-6 text-center text-base text-red-500"
                        role="alert"
                      >
                        {error.first_name}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="ml-2 text-base font-bold sm:text-xl sm:font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      className="w-full rounded-full border border-gray-300 px-4 py-2 placeholder:text-sm focus:border-primaryBlue focus:outline-none"
                      placeholder={'Last name'}
                      onChange={handleChange}
                    />
                    {error && (
                      <div
                        id={`${name}-error`}
                        className="relative -mt-[6px] ms-6 text-center text-base text-red-500"
                        role="alert"
                      >
                        {error.last_name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="ml-2 text-base font-bold sm:text-xl sm:font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full rounded-full border border-gray-300 px-4 py-2 placeholder:text-sm focus:border-primaryBlue focus:outline-none"
                    placeholder={'Email'}
                    required
                  />
                  {(emailError || error?.email) && (
                    <div
                      className="relative -mt-[6px] ms-6 text-center text-base text-red-500"
                      role="alert"
                    >
                      {emailError || error?.email}
                    </div>
                  )}
                </div>
                <div className="px-2">
                  <TermsCheckbox checked={checked} setChecked={setChecked} />
                  {error && (
                    <div
                      id={`${name}-error`}
                      className="relative -mt-[6px] ms-6 text-center text-base text-red-500"
                      role="alert"
                    >
                      {error.general}
                    </div>
                  )}
                </div>
              </div>

              <div className="mx-8 mt-6 flex flex-col-reverse items-center justify-center gap-2 space-y-4 md:mx-0 md:flex-row md:gap-4 md:space-y-0">
                <button
                  onClick={previousStep}
                  className="h-[55px] w-full rounded-2xl border border-mediumGray bg-transparent text-mediumGray hover:border-none hover:bg-primaryBlue hover:text-white md:h-[40px] md:w-[115px]"
                  aria-label="Go to previous step"
                >
                  <span aria-hidden="true">{'<'}</span> Back
                </button>

                <button
                  type="submit"
                  disabled={isLoading || !checked}
                  className="h-[55px] w-full rounded-2xl bg-primaryBlue text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-lightGray disabled:text-mediumGray md:h-[40px] md:w-[115px]"
                  aria-label="Go to next step"
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          ) : (
            <OTPForm
              email={email}
              isLoading={isLoading}
              error={error}
              onOTPSubmit={onOTPSubmit}
              onOTPChange={handleOTPChange}
              onBackToEmail={() => setShowOTPInput(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Panel03;
