import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import App from "./App";

// Adding LANGUAGE_DETECTOR_API KEY to the head element
const LANGUAGE_EL = document.createElement("meta");
LANGUAGE_EL.httpEquiv = "origin-trial";
LANGUAGE_EL.content = import.meta.env.VITE_LANGUAGE_DETECTOR_API;
document.head.appendChild(LANGUAGE_EL);

// Adding SUMMARIZE_API KEY to the head element
const SUMMARIZE_EL = document.createElement("meta");
SUMMARIZE_EL.httpEquiv = "origin-trial";
SUMMARIZE_EL.content = import.meta.env.VITE_SUMMARIZE_API;
document.head.appendChild(SUMMARIZE_EL);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>
);
