import ReactDOM from "react-dom/client";
import "./index.scss";

import App from "./App";
import { AuthProvider } from "./home-page/services/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
