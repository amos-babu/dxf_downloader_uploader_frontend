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
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
  isAuthenticated: boolean | null;
  isInitialized: boolean;
  loggedIn: boolean;
  login: (userToken: string, tokenExpiryDate: string) => void;
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
  const [idParams, setIdParams] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [userData, setUserData] = useState<ProfileDetailsProps | null>(null);
  const authToken = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const endpoint = idParams
          ? `${apiUrl}user_details/${idParams}`
          : `${apiUrl}user`;

        const response = await axios.get<profileEditResponse>(endpoint, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setCanEdit(response.data.can_edit);
        setUserData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [idParams, authToken]);

  const checkTokenExpiry = (
    userToken: string | null,
    authTokenExpiry: string | null
  ) => {
    if (!authTokenExpiry || !userToken) {
      logout();
      return null;
    }

    const now = Date.now();
    const expiryTime = parseInt(authTokenExpiry, 10);

    if (now > expiryTime) {
      logout();
      return null;
    }
    return userToken;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("token_expiry_date");
    checkTokenExpiry(token, tokenExpiry);
  }, []);

  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(!!authToken);
      setIsInitialized(true);
      setLoggedIn(true);
    }
  }, []);

  const setId = (id: string) => {
    setIdParams(id);
  };

  const login = (userToken: string, authTokenExpiry: string) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("token_expiry_date", authTokenExpiry);
    setIsAuthenticated(true);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry_date");
    setIsAuthenticated(false);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        show,
        handleClose,
        handleShow,
        isAuthenticated,
        isInitialized,
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
