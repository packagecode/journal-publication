import useAuthService from "@/hooks/useAuthService";
import { SetRedirectUrl } from "@/redux/action";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface PrivateRouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated } = useAuthService();

  useEffect(() => {
    dispatch(SetRedirectUrl(location.pathname));
  }, [location.pathname]);

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
