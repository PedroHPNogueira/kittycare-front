// import ReactPixel from 'react-facebook-pixel';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Active from '/assets/Active.png';

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

  const user = useAppSelector((state) => state.user);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <img
            src={user.photo || Active}
            alt="user"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-md font-semibold">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-2 h-[35px] w-[100px] rounded-lg bg-blue-600 text-[14px] text-white transition-colors duration-200 hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          Logout
        </button>
      </div>
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
