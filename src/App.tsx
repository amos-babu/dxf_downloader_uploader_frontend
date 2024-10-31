import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Router, Routes } from "react-router-dom";
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
  return (
    <>
      <AuthProvider>
        <NavbarBs />
        <div className="container mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/create" element={<Create />} />
              <Route path="/show/:id" element={<DxfPage />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
