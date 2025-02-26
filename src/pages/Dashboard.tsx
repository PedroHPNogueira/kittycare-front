// import ReactPixel from 'react-facebook-pixel';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/features/userSlice';
import { useAppDispatch } from '../Redux/hooks';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

// Navigation items configuration
const NAV_ITEMS = [
  { path: '/login', label: 'Login' },
  { path: '/signup', label: 'Signup' },
  { path: '/priceselection', label: 'Price Selection' },
  { path: '/paymentmethod', label: 'Payment Method' },
  { path: '/paymentdetail', label: 'Payment Detail' },
  { path: '/cat-assistant', label: 'Chatroom' },
  { path: '/cat-profile', label: 'Profile' },
  { path: '/progress', label: 'Go to Progress' },
] as const;

/**
 * Dashboard component that displays navigation links and logout functionality
 */
const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Track ViewContent when dashboard loads
    // ReactPixel.track('ViewContent');
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Layout>
      <nav className="flex min-h-[700px] w-full flex-col items-center justify-center gap-4">
        {NAV_ITEMS.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className="hover:text-primary text-xl transition-colors"
          >
            {label}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="cursor-pointer text-xl transition-colors hover:text-red-500"
        >
          Logout
        </button>
      </nav>
    </Layout>
  );
};

export default Dashboard;
