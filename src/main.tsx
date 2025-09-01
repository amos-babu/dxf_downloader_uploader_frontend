import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext.tsx";
import { FileContextProvider } from "./utils/FileContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Home } from "./pages/Home.tsx";
// import { DxfPage } from "./pages/DxfPage.tsx";
// import { Profile } from "./pages/Profile.tsx";
// import NotFound from "./pages/NotFound.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/show/:id",
//     element: <DxfPage />,
//   },
//   {
//     path: "/profile/:id",
//     element: <Profile />,
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FileContextProvider>
          <App />
        </FileContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
