import { useSupervisorLogs } from "../useSupervisorLogs";

export function SupervisorLogPanel() {
  const logs = useSupervisorLogs();

  return (
    <div style={{ fontSize: 12 }}>
      <strong>Supervisor Logs</strong>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {logs.map((log, i) => (
          <li key={i}>
            [{new Date(log.ts).toLocaleTimeString()}]{" "}
            <strong>{log.level}</strong> — {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
