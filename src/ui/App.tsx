import { useEffect, useRef } from "react";
import { rendererLog } from "./supervisor/rendererLog";
import { SupervisorLogPanel } from "./supervisor/SupervisorLogPanel";
import { ProjectView } from "./project/ProjectView";
import { IdentityPanel } from "@/ui/identity/IdentityPanel";


export function App() {
  // ✅ hooks live INSIDE the component
  const contextDetected = useRef(false);

  useEffect(() => {
    const identity = window.pact.getIdentity();

    rendererLog("info", "Renderer mounted");
    rendererLog("info", "PACT identity loaded", {
      userId: identity.userId,
      displayName: identity.displayName,
    });
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
        <IdentityPanel/>
        <SupervisorLogPanel />
      </aside>
      <main style={{ padding: 24 }}>
        <ProjectView />
      </main>
    </div>
  );
}
