import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectAuthStatus } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectAuthStatus);
  const location = useLocation();

  return !onlyUnAuth && !isAuthChecked ? (
    <Navigate replace to='/login' state={{ from: location }} />
  ) : onlyUnAuth && isAuthChecked ? (
    <Navigate replace to={location.state?.from || { pathname: '/' }} />
  ) : (
    children
  );
};
