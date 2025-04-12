import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider.tsx";
import { SynthProvider } from "./contexts/SynthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <SynthProvider>
        <App />
      </SynthProvider>
    </Provider>
  </StrictMode>
);
