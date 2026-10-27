import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";

const Authorize = lazy(() => import("@/pages/Authorize"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      <Authorize />
    </Suspense>
  </StrictMode>,
);
