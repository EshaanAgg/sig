import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PipelineContextProvider } from "./context/PipelineContext";

// Load the default typography for Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PipelineContextProvider>
      <App />
    </PipelineContextProvider>
  </React.StrictMode>
);
