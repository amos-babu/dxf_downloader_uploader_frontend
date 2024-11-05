import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Router, Routes } from "react-router-dom";
import { useState } from "react";
import NavbarBs from "./components/NavbarBs";
import { Create } from "./pages/Create";
import { DxfPage } from "./pages/DxfPage";
import { Home } from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoute";
import { AuthProvider } from "./utils/AuthContext";
import NotFound from "./pages/NotFound";

function App() {
  const [notification, setNotification] = useState<string | null>(null);

  const logoutNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  return (
    <>
      <AuthProvider>
        <NavbarBs logoutNotification={logoutNotification} />
        <div className="container mb-4">
          {notification && (
            <div className="row position-relative">
              <div
                style={{ left: "10px" }}
                className="d-flex z-1 position-fixed justify-content-end right-10"
              >
                <div className="alert alert-success shadow-lg" role="alert">
                  {notification}
                </div>
              </div>
            </div>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/show/:id" element={<DxfPage />} />
            <Route
              path="/login"
              element={<Login logoutNotification={logoutNotification} />}
            />
            <Route
              path="/register"
              element={<Register logoutNotification={logoutNotification} />}
            />
            <Route element={<PrivateRoutes />}>
              <Route path="/create" element={<Create />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
