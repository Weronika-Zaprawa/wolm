import HomePage from "./home-page/HomePage";
import { useAuth } from "./home-page/services/AuthContext";
import { AuthRoutes } from "./authentication/AuthRoutes";

export default function App() {
  const { accessToken } = useAuth();

  return accessToken === null ? <AuthRoutes /> : <HomePage />;
}
