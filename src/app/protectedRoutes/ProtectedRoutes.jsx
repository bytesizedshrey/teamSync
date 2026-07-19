import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
  const { employee } = useSelector((state) => state.auth);

  if (!employee) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
