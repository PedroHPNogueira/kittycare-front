import React from 'react';
import NavigationButtons from '../NavigationButtons';
import { PanelProps } from './types';
import { useCatForm } from './hooks/useCatForm';

/**
 * Panel02 Component
 * Collects basic information about the user's cat including gender, age, location
 */
const Panel02: React.FC<PanelProps> = ({ nextStep, previousStep }) => {
  const {
    catName,
    setCatName,
    gender,
    setGender,
    age,
    setAge,
    errors,
    handleSubmit,
    isValid,
  } = useCatForm(nextStep);

  return (
    <div className="mx-auto w-full max-w-md p-4 font-inter lg:max-w-lg lg:p-6">
      <header className="mb-6 text-center">
        <h1 className="mb-2 text-2xl font-bold lg:text-3xl">
          Tell Us About Your Cat
        </h1>
        <p className="text-md mx-12 text-darkGray">
          Please provide some basic details about your cat to help us offer the
          best advice.
        </p>
      </header>

      <div className="mx-10 mb-6 space-y-4">
        {/* Gender Selection */}
        <div className="text-center">
          <p className="text-md mb-2 font-medium">
            Please tell us your cat's name{' '}
            <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            value={catName || ''}
            onChange={(e) => setCatName(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-4 py-2 placeholder:text-sm focus:border-primaryBlue focus:outline-none lg:w-3/4"
            placeholder={"Input your cat's name"}
          />
          {errors.catName && (
            <p className="text-sm text-red-500">{errors.catName}</p>
          )}
        </div>
        <div className="text-center">
          <p className="text-md mb-2 font-medium">
            Select your cat's gender <span className="text-red-500">*</span>
          </p>
          <div className="flex justify-center space-x-3">
            {['Male', 'Female'].map((option) => (
              <button
                key={option}
                className={`w-44 rounded-full border px-4 py-2 lg:w-32 lg:px-9 ${
                  gender === option
                    ? 'bg-primaryBlue text-white'
                    : 'border-gray-300'
                }`}
                onClick={() => setGender(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender}</p>
          )}
        </div>

        {/* Name & Age Input */}
        <div className="text-center">
          <select
            value={age || ''}
            onChange={(e) => setAge(e.target.value)}
            className="h-12 w-full rounded-full border border-gray-300 bg-white px-4 placeholder:text-sm focus:border-primaryBlue focus:outline-none lg:w-3/4"
          >
            <option value="" disabled>
              Select your cat's age
            </option>
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} {i + 1 === 1 ? 'year' : 'years'}
              </option>
            ))}
          </select>
          {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
        </div>
      </div>

      <NavigationButtons
        nextStep={handleSubmit}
        previousStep={previousStep}
        isNextDisabled={!isValid}
      />
    </div>
  );
};

export default Panel02;
