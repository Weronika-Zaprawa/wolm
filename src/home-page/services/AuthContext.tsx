import { ReactElement, createContext, useContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  saveToken: (token: string) => void;
  deleteToken: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const LOCAL_TOKEN_KEY = "token";

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(LOCAL_TOKEN_KEY)
  );

  const saveToken = (token: string) => {
    localStorage.setItem(LOCAL_TOKEN_KEY, token);
    setToken(token);
  };

  const deleteToken = () => {
    localStorage.removeItem(LOCAL_TOKEN_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, deleteToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
