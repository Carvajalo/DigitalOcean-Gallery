import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ImageContextProvider } from "./context/ImageContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ImageContextProvider>
      <App />
    </ImageContextProvider>
  </React.StrictMode>
);
