// src/ui/index.tsx

import { createRoot } from "react-dom/client";
import { App } from "./ui/App";

console.log("index.tsx loaded");

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container #root not found");
}

const root = createRoot(container);
root.render(<App />);
