import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";  <-- Is line ko hata do
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);