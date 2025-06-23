import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext.tsx";
import { FileContextProvider } from "./utils/FileContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <FileContextProvider>
        <App />
      </FileContextProvider>
    </AuthProvider>
  </BrowserRouter>
);
