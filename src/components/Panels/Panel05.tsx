import React from 'react';
import { useMedicalHistory } from './hooks/useMedicalHistory';
import NavigationButtons from '../NavigationButtons';
import { Panel05Props } from '../../types/panel.types';
import { MEDICAL_CONDITIONS } from './constants/medicalConditions';

const Panel05: React.FC<Panel05Props> = ({ nextStep, previousStep }) => {
  const { formData, updateFormField, isFormValid } = useMedicalHistory();

  const renderFormField = (
    label: string,
    placeholder: string,
    field: keyof typeof formData,
  ) => (
    <div className="text-center">
      <label className="mb-0.5 block text-sm font-medium">{label}</label>
      <input
        type="text"
        value={formData[field] || ''}
        onChange={(e) => updateFormField(field, e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-300 px-4 py-2 font-inter text-sm placeholder:text-xs placeholder:text-mediumGray focus:border-primaryBlue focus:outline-none md:placeholder:text-sm"
      />
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-md p-4 font-inter lg:max-w-2xl lg:p-6">
      <div className="mb-6 text-center">
        <h1 className="mx-4 mb-2 px-3 text-2xl font-bold md:mx-2 md:px-0 lg:px-0">
          Tell Our Experts About Your Cat's Medical History
        </h1>
        <p className="lg:text-md mx-4 px-4 text-sm text-darkGray lg:px-8">
          Let our experts know about any medical conditions or special needs
          your cat has so we can provide you with the best advice.
        </p>
      </div>

      <div className="space-y-4 px-8 lg:px-40">
        <div className="text-center">
          <label className="mb-0.5 block text-sm font-medium">
            Medical Conditions
          </label>
          <select
            value={formData.medicalCondition || ''}
            onChange={(e) =>
              updateFormField('medicalCondition', e.target.value)
            }
            className="w-full rounded-full border border-gray-300 px-4 py-2 font-inter text-sm capitalize placeholder:text-xs placeholder:text-mediumGray focus:border-primaryBlue focus:outline-none md:placeholder:text-sm"
          >
            <option value="" disabled className="bg-lightWhite text-sm">
              Select a condition
            </option>
            {MEDICAL_CONDITIONS.map((condition) => (
              <option
                key={condition}
                value={condition}
                className="bg-lightWhite text-sm capitalize"
              >
                {condition}
              </option>
            ))}
          </select>
        </div>
        {/* {renderFormField("Medical Conditions", "Enter current medical conditions", "medicalCondition")} */}
        {renderFormField(
          'Medications',
          'Enter current medication',
          'medication',
        )}
        {renderFormField(
          'Dietary Restrictions',
          'Enter food allergies',
          'dietaryRestrictions',
        )}
        {renderFormField(
          'Surgery History',
          'Enter recent surgeries',
          'surgeryHistory',
        )}
      </div>

      {/* <div className="flex flex-col items-center mt-8 text-center">
        <p className="text-sm text-darkGray mt-4 font-light px-8 md:mx-12 lg:mx-36">
          If your cat has no medical history, you can{" "}
          <span className="text-primaryBlue cursor-pointer" onClick={nextStep}>
            skip this step
          </span>
        </p>
      </div> */}
      <div className="mt-6 flex items-center justify-center px-8 md:mx-7 md:mb-6 lg:px-40">
        <button
          className="mx-auto h-[55px] w-full rounded-2xl bg-primaryBlue text-white hover:bg-opacity-90 md:h-[40px]"
          onClick={nextStep}
        >
          Skip Step
        </button>
      </div>

      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={!isFormValid()}
      />
    </div>
  );
};

export default Panel05;
