import { ReactElement, createContext, useContext, useState } from "react";

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  saveTokens: (accessToken: string, refreshToken: string) => void;
  deleteTokens: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const LOCAL_ACCESS_TOKEN_KEY = "accessToken";
export const LOCAL_REFRESH_TOKEN_KEY = "refreshToken";

export const AuthProvider = ({ children }: { children: ReactElement }) => {
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

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, saveTokens, deleteTokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
