import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContextTypeProps = {
  isAuthenticated: boolean;
  loggedIn: boolean;
  login: (userToken: string) => void;
  setId: (id: string) => void;
  logout: () => void;
  userData: ProfileDetailsProps | null;
  canEdit: boolean;
};

type CurrentUserFilesPictureProps = {
  picture_path: string;
  id: number;
};

type profileEditResponse = {
  data: ProfileDetailsProps;
  can_edit: boolean;
};

type ProfileDetailsProps = {
  name: string;
  email: string;
  username: string;
  bio: string | null;
  profile_pic_path: string | null;
  files: CurrentUserFilesPictureProps[];
};

const AuthContext = createContext<AuthContextTypeProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [idParams, setIdParams] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<ProfileDetailsProps | null>(null);
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const endpoint = idParams
          ? `http://127.0.0.1:8000/api/user_details/${idParams}`
          : `http://127.0.0.1:8000/api/user`;

        const response = await axios.get<profileEditResponse>(endpoint, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        // console.log(response);
        setCanEdit(response.data.can_edit);
        setUserData(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [idParams, authToken]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
  }, []);

  const setId = (id: string) => {
    setIdParams(id);
  };

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
      value={{
        isAuthenticated,
        setId,
        login,
        logout,
        loggedIn,
        userData,
        canEdit,
      }}
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
