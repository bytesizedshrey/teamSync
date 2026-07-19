import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

const PublicRoutes = () => {
  const { employee } = useSelector((state) => state.auth);

  // If the user is already logged in, redirect them away from public pages (like Login/Register) to the dashboard
  if (employee) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
