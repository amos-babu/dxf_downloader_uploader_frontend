import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import NavbarBs from "./components/NavbarBs";
import { Create } from "./pages/Create";
import { DxfPage } from "./pages/DxfPage";
import { Home } from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <NavbarBs />
      <div className="container mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/show/:id" element={<DxfPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
