import { useEffect, useRef } from "react";
import { rendererLog } from "./supervisor/rendererLog";
import { SupervisorLogPanel } from "./supervisor/SupervisorLogPanel";
import { ProjectView } from "./project/ProjectView";

console.log("App module loaded");

export function App() {
  // ✅ hooks live INSIDE the component
  const contextDetected = useRef(false);

  console.log("App render");

  useEffect(() => {
    rendererLog("info", "Renderer mounted");
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        height: "100vh",
      }}
    >
      <aside style={{ borderRight: "1px solid #ddd", padding: 12, overflow: "auto" }}>
        <SupervisorLogPanel />
      </aside>
      <main style={{ padding: 24 }}>
        <ProjectView />
      </main>
    </div>
  );
}
