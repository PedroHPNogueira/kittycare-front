import React, { useEffect } from 'react';
import PawAnimation from '../PawPrintAnimation';
import useCatRecommendations from '../../hooks/useCatRecommendations';
import useCreateCat from '../../hooks/useCreateCat';
// import { useNavigate } from 'react-router-dom';

interface Panel13Props {
  nextStep: () => void;
  previousStep: () => void;
}

const LOADING_DELAY = 15000;

const Panel13: React.FC<Panel13Props> = ({ nextStep }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const { getCatRecommendations } = useCatRecommendations();
  const { createCat } = useCreateCat();
  // const navigate = useNavigate();

  useEffect(() => {
    const initializeCat = async () => {
      try {
        let success;
        if (localStorage.getItem('email')) {
          success = await createCat();
        } else {
          success = await getCatRecommendations();
        }

        if (success) {
          setTimeout(() => {
            // setIsLoading(false);
            nextStep();
            // navigate('/signup')
          }, LOADING_DELAY);
        }
      } catch (error) {
        console.error('Error creating cat:', error);
        // setIsLoading(false);
      }
    };

    initializeCat();
  }, [getCatRecommendations, nextStep]);

  return (
    <div className="mx-auto w-full max-w-md p-4 font-inter lg:max-w-4xl lg:p-6">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-bold lg:text-3xl">
          We're Creating Your Cat's Personal Plan!
        </h1>
        <p className="lg:text-md mx-auto max-w-2xl text-sm text-darkGray">
          Based on your selections, we're crafting a customized care and
          training plan just for your cat. This will only take a moment!
        </p>
      </header>

      <main>
        <PawAnimation className="mx-16 flex h-72 w-72 items-center justify-center lg:w-full" />

        <div className="mt-4 text-center">
          <p className="text-md font-semibold text-darkGray lg:text-lg">
            Fetching the best advice for your cat...
          </p>
          <p className="text-sm text-gray-500">This will take a few seconds</p>
        </div>

        <div className="mx-4 mt-6 max-w-md rounded-2xl border-pearlBush bg-lightPearl px-6 py-4 text-center text-mediumGray lg:mx-auto lg:max-w-lg lg:px-10">
          <p className="text-xs font-normal md:text-sm">
            We're getting everything ready! Soon, you'll have a personalized
            plan that fits your cat's needs and lifestyle.
          </p>
        </div>
      </main>

      {/* <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={isLoading}
      /> */}
    </div>
  );
};

export default Panel13;
