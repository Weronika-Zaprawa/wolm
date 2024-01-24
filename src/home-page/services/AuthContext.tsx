import {
  ReactElement,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { LoginFormValues } from "../../authentication/LoginPage";
import { resolve } from "path";

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  saveTokens: (accessToken: string, refreshToken: string) => void;
  deleteTokens: () => void;
  login: (values: LoginFormValues) => Promise<void>;
  handleRefreshTokens: () => Promise<void>;
  handleFetch: (url: string, options: RequestInit) => Promise<Response>;
};

type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const LOCAL_ACCESS_TOKEN_KEY = "accessToken";
export const LOCAL_REFRESH_TOKEN_KEY = "refreshToken";

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const refreshingTokens = useRef<boolean>(false);

  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem(LOCAL_REFRESH_TOKEN_KEY)
  );

  const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, accessToken);
    setAccessToken(accessToken);

    localStorage.setItem(LOCAL_REFRESH_TOKEN_KEY, refreshToken);
    setRefreshToken(refreshToken);
  };

  const deleteTokens = () => {
    localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY);
    setAccessToken(null);

    localStorage.removeItem(LOCAL_REFRESH_TOKEN_KEY);
    setRefreshToken(null);
  };

  async function login(values: LoginFormValues) {
    values.email = values.email.trim();
    const response = await fetch(`https://wolm.onrender.com/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      alert("Podano błędny email lub hasło");
    } else {
      const token: LoginResponse = await response.json();
      saveTokens(token.access_token, token.refresh_token);
    }
  }

  async function handleRefreshTokens() {
    refreshingTokens.current = true;
    const response = await fetch(`https://wolm.onrender.com/refresh`, {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const token: LoginResponse = await response.json();
      saveTokens(token.access_token, token.refresh_token);
    } else {
      deleteTokens();
    }
    refreshingTokens.current = false;
  }

  async function sleep() {
    return new Promise((resolve: any) => {
      setTimeout(resolve, 50);
    });
  }

  async function handleFetch(url: string, options: RequestInit) {
    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY) ?? "",
      },
    });
    if (response.status === 401) {
      if (refreshingTokens.current === false) {
        await handleRefreshTokens();
      } else {
        while (refreshingTokens.current === true) {
          await sleep();
        }
      }
      if (localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)) {
        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            "Content-Type": "application/json",
            Authorization: localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY) ?? "",
          },
        });
      }
    }
    return response;
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        saveTokens,
        deleteTokens,
        login,
        handleRefreshTokens,
        handleFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
