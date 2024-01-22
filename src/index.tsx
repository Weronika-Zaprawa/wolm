import ReactDOM from "react-dom/client";
import "./index.scss";

import App from "./App";
import { AuthProvider } from "./home-page/services/AuthContext";
import LoginPage from "./home-page/components/login-page/LoginPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

// root.render(
//   <AuthProvider>
//     <LoginPage />
//   </AuthProvider>
// );
