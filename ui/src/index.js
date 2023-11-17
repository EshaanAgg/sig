import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PipelineContextProvider } from "./context/PipelineContext";
import { FileContextProvider } from "./context/FileContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// Load the default typography for Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PipelineContextProvider>
      <FileContextProvider>
        <App />
        <ToastContainer />
      </FileContextProvider>
    </PipelineContextProvider>
  </React.StrictMode>
);
