import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
