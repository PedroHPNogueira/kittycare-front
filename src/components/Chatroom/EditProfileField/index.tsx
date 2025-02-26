import { useState } from 'react';
import CustomDropdown from './CustomDropdown';
import CustomInput from './CustomInput';
import CustomTextArea from './CustomTextArea';
import CancelModal from './CancelModal';
import { useProfileForm } from './hooks/useProfileForm';
import { BREED_OPTIONS, GENDER_OPTIONS } from './constants';
import { ProfileInfo } from './types';
import Header from '../../Header';
import { useSubscriptionCheck } from '../../../hooks/useSubscriptionCheck';

const EditProfileField = () => {
  useSubscriptionCheck();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    photo,
    profileInfo,
    dataChanged,
    handlePhotoChange,
    handleInputChange,
    handleProfileUpdate,
    isFormValid,
  } = useProfileForm();

  return (
    <div className="mx-auto max-w-full p-2 pb-6 sm:w-[1130px]">
      <Header />

      <main className="px-4">
        <section className="mb-6 text-center">
          <h2 className="mb-4 text-4xl font-bold capitalize">Edit Profile</h2>
          <h5 className="mx-auto w-full text-2xl font-medium sm:w-[400px]">
            Update your details to keep your profile current.
          </h5>
        </section>

        <section className="my-6 flex flex-col justify-between gap-[30px] sm:flex-row">
          {/* Photo Upload Section */}
          <PhotoUploadSection photo={photo} onPhotoChange={handlePhotoChange} />

          {/* Form Fields Section */}
          <FormFieldsSection
            profileInfo={profileInfo}
            onInputChange={(field: keyof ProfileInfo) =>
              handleInputChange(field)
            }
          />
        </section>

        {/* Action Buttons */}
        <ActionButtons
          dataChanged={dataChanged}
          isFormValid={isFormValid()}
          onSave={handleProfileUpdate}
          onCancel={() => setIsModalOpen(true)}
        />
      </main>

      <CancelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
      />
    </div>
  );
};

// Sub-components
const PhotoUploadSection = ({
  photo,
  onPhotoChange,
}: {
  photo?: File;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="m-auto flex w-full flex-col gap-4 sm:w-[442px]">
    <label className="text-center text-xl font-semibold">Add Photo</label>
    <div className="relative h-[415px] w-full sm:w-[442px]">
      {photo ? (
        <img
          className="h-full w-full rounded-[20px] object-cover"
          src={URL.createObjectURL(photo)}
          alt="Selected cat"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#898B90] border-opacity-30 bg-[#D1D6E2] bg-opacity-30">
          <img className="m-3" src="/assets/svg/upload.svg" alt="upload icon" />
          <p className="m-1 text-xl font-medium">Upload photo</p>
          <p className="text-base font-medium opacity-60">
            At least 256px X 256px
          </p>
          <p className="text-base font-medium opacity-60">PNG or JPG</p>
        </div>
      )}
      <input
        className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
        type="file"
        accept="image/*"
        onChange={onPhotoChange}
      />
    </div>
  </div>
);

const FormFieldsSection = ({
  profileInfo,
  onInputChange,
}: {
  profileInfo: ProfileInfo;
  onInputChange: (field: keyof ProfileInfo) => (value: string) => void;
}) => (
  <div className="w-full">
    <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2">
      <CustomInput
        label="Your cat's name"
        value={profileInfo.name}
        onChange={onInputChange('name')}
        placeholder="Enter your name"
      />
      <CustomDropdown
        label="Breed"
        options={[...BREED_OPTIONS]}
        selectedOption={profileInfo.breed}
        onSelect={onInputChange('breed')}
        placeholder="Select a breed"
      />
      <CustomDropdown
        label="Gender"
        options={[...GENDER_OPTIONS]}
        selectedOption={profileInfo.gender}
        onSelect={onInputChange('gender')}
        placeholder="Select gender"
      />
      <CustomInput
        label="Target Weight"
        value={profileInfo.target_weight}
        onChange={onInputChange('target_weight')}
        placeholder="Enter target weight"
        type="number"
      />
      <CustomTextArea
        label="Medical History"
        value={profileInfo.medical_history}
        onChange={onInputChange('medical_history')}
        placeholder="Enter medical history"
        rows={4}
      />
      <CustomTextArea
        label="Dietary Restrictions"
        value={profileInfo.dietary_restrictions}
        onChange={onInputChange('dietary_restrictions')}
        placeholder="Enter dietary preferences"
        rows={4}
      />
    </div>
  </div>
);

const ActionButtons = ({
  isFormValid,
  dataChanged,
  onSave,
  onCancel,
}: {
  dataChanged: boolean;
  isFormValid: boolean;
  onSave: () => void;
  onCancel: () => void;
}) => (
  <div className="flex flex-col justify-start gap-[10px] sm:flex-row-reverse sm:gap-[30px]">
    <button
      className={`h-[55px] rounded-[20px] border px-[42px] py-[14px] ${
        dataChanged && isFormValid
          ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
          : 'bg-[#D1D6E2] text-[#898B90]'
      }`}
      onClick={onSave}
    >
      Save Profile
    </button>
    <button
      className="h-[55px] rounded-[20px] border border-[#898B90] px-[42px] py-[14px] text-[#898B90] hover:bg-[#dddddd]/70 active:bg-[#cccccc]"
      onClick={onCancel}
    >
      Cancel Subscription
    </button>
  </div>
);

export default EditProfileField;
