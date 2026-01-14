import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/utils.css"
import App from "./App.tsx";

import { SynthProvider } from "./contexts/SynthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <SynthProvider>
        <App />
      </SynthProvider>
  </StrictMode>
);
