import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProviderProps {
  children: ReactNode;
}
interface AuthContextTypeProps {
  isAuthenticated: boolean;
  loggedIn: boolean;
  login: (userToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextTypeProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
  }, []);

  const login = (userToken: string) => {
    setToken(userToken);
    localStorage.setItem("token", userToken);
    setLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within an AuthProvider");
  }
  return context;
};
