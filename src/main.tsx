import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import Home from "@/pages/Home";

const Authorize = lazy(() => import("@/pages/Authorize"));

// the Worker serves this page at / and /authorize (api/index.ts)
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      {location.pathname === "/authorize" ? <Authorize /> : <Home />}
    </Suspense>
  </StrictMode>,
);
