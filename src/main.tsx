
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner"; // Import Sonner's Toaster

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(

    <BrowserRouter>
      <App />
      <Toaster /> {/* Sonner Toast component */}
    </BrowserRouter>
);
