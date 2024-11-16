import axios from "axios";
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
  profileData: ProfileDetailsProps | null;
}
interface ProfileDetailsProps {
  name: string;
  email: string;
  username: string;
  bio: string | null;
  profile_pic_path: string | null;
}

const AuthContext = createContext<AuthContextTypeProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileDetailsProps | null>(
    null
  );

  const authtToken3 = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${authtToken3}`,
        },
      });
      console.log(response.data.data);
      setProfileData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loggedIn, profileData }}
    >
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
