import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export const AUTH_ROUTE_PATHS = {
  LOGIN: "/",
  REGISTER: "/register",
};
export const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AUTH_ROUTE_PATHS.LOGIN} element={<LoginPage />} />
        <Route path={AUTH_ROUTE_PATHS.REGISTER} element={<RegisterPage />} />
        <Route path="*" element={<Navigate to={AUTH_ROUTE_PATHS.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  );
};
