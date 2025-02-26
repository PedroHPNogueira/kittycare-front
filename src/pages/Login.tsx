import { useState } from 'react';
import { LoginForm } from '../components/Login/LoginForm';
import Layout from '../components/Layout';
import { changeMethod } from '../Redux/features/billingSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '../Redux/hooks';
import ReactPixel from 'react-facebook-pixel';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithOTPAPI } from '../services/api';
import {
  loginUserWithOTPAsync,
  googleLoginUserAsync,
} from '../Redux/features/userSlice';
import { useRive, UseRiveParameters } from '@rive-app/react-canvas';
import styles from '../components/LoadingOverlay/LoadingOverlay.module.css';
import googleIcon from '/assets/png/google.png';
import { LogBtnBy } from '../components/Login/LogBtnBy';
import { Divider } from '../components/Login/Divider';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=id_token&scope=openid email profile&nonce=your_nonce`;

interface LoginError {
  email?: string;
  otp?: string;
  general?: string;
}

const RIVE_ANIMATION_CONFIG: UseRiveParameters = {
  src: 'riv/V2/Pulse_kitty.riv',
  autoplay: true,
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<LoginError>({});
  const [isLoading, setIsLoading] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);

  // Handle plan selection from URL
  useEffect(() => {
    ReactPixel.track('ViewContent');

    const planSelection = urlParams.get('planSelection');
    if (planSelection) {
      const isYearly = planSelection.toLowerCase() === 'yearly';
      dispatch(changeMethod({ method: isYearly }));
    }
  }, [dispatch, urlParams]);

  const handleEmailSubmit = async (email: string) => {
    setError({});
    setIsLoading(true);

    try {
      await signInWithOTPAPI(email);
      return true;
    } catch (err: any) {
      if (err.message === 'Signups not allowed for otp') {
        setError({
          general: 'User not found',
        });
        return false;
      }
      setError({
        general: err.message || 'Failed to send verification code',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (email: string, token: string) => {
    setError({});
    setIsLoading(true);

    try {
      await dispatch(loginUserWithOTPAsync({ email, token })).unwrap();

      // Check for subscription and redirect accordingly
      const subscriptionId = localStorage.getItem('subscriptionId');
      if (!subscriptionId || subscriptionId === 'undefined') {
        navigate(`/progress?${urlParams.toString()}`);
        return;
      }

      // Check for cat profile
      const catId = localStorage.getItem('catId');
      if (!catId || catId === 'undefined') {
        navigate('/progress');
        return;
      }

      // If everything exists, redirect to chat
      navigate('/cat-assistant');
    } catch (err: any) {
      setError({
        general: err.message || 'Invalid verification code',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const { RiveComponent } = useRive(RIVE_ANIMATION_CONFIG);
  const isPhone = window.innerWidth < 768;

  const pathname = useLocation().pathname;

  useEffect(() => {
    const getGoogleTokenFromUrl = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      return params.get('id_token');
    };

    const googleToken = getGoogleTokenFromUrl();

    // If no token, return
    if (!googleToken) return;

    // If token, login
    const handleGoogleLogin = async () => {
      await dispatch(googleLoginUserAsync(googleToken));

      navigate('/dashboard');
    };

    handleGoogleLogin();
  }, [pathname]);

  return (
    <Layout>
      <div
        className={`m-auto mt-8 max-w-[90%] rounded-3xl border-2 border-[#B8B8B8] bg-white px-[21px] pb-20 sm:w-[600px] sm:px-[80px] ${isPhone ? 'py-[47px] sm:py-[70px]' : 'pb-[47px] sm:pb-[70px]'}`}
      >
        {!isPhone && (
          <div className={`${styles.animationContainer} mx-auto h-[200px]`}>
            {RiveComponent && <RiveComponent />}
          </div>
        )}
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="pb-4 text-[28px] font-semibold sm:text-[40px]">
              Login
            </h2>
            <p className="text-md font-semibold text-gray-500 md:text-xl">
              Haven't made an account yet?{' '}
              <span
                className="cursor-pointer text-blue-600"
                onClick={() => navigate('/progress')}
              >
                Sign Up now.
              </span>
            </p>
          </div>

          <LoginForm
            error={error}
            isLoading={isLoading}
            handleEmailSubmit={handleEmailSubmit}
            handleOTPSubmit={handleOTPSubmit}
          />
        </div>
        <div className="relative mb-12 mt-8 flex flex-row items-center justify-center sm:mt-10">
          <Divider className="!w-full" />
          {isPhone && (
            <div className="absolute -top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2 rounded-full bg-white px-4">
              <p className="text-[16px] font-semibold text-[#00000060]">Or</p>
            </div>
          )}
          <div className="absolute -top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-[-30px] gap-2 rounded-full bg-white px-4">
            <LogBtnBy
              src={googleIcon}
              alt="google"
              className="flex items-center justify-center"
              onClick={redirectToGoogleLogin}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
