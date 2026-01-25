import { SupervisorLogPanel } from "./supervisor/SupervisorLogPanel";

export function App() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", height: "100vh" }}>
      <aside style={{ borderRight: "1px solid #ddd", padding: 12, overflow: "auto" }}>
        <SupervisorLogPanel />
      </aside>
      <main style={{ padding: 24 }}>
        <h2>Workspace</h2>
      </main>
    </div>
  );
}
