import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/home";
import { Route, Routes } from "react-router-dom";
import NavbarBs from "./components/NavbarBs";
import { Create } from "./pages/Create";
import { DxfPage } from "./pages/DxfPage";

function App() {
  return (
    <>
      <NavbarBs />
      <div className="container mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/show/:id" element={<DxfPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
