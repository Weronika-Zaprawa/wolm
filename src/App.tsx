import HomePage from "./home-page/HomePage";
import LoginPage from "./home-page/components/login-page/LoginPage";
import { useAuth } from "./home-page/services/AuthContext";

export default function App() {
  const { token, saveToken, deleteToken } = useAuth();

  return token === null ? <LoginPage /> : <HomePage />;
}
