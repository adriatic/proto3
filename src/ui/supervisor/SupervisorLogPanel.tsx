import { useSupervisorLogs } from "../useSupervisorLogs";

export function SupervisorLogPanel() {
  const logs = useSupervisorLogs();

  return (
    <div style={{ fontSize: 12 }}>
      <strong>Supervisor Logs</strong>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {logs.map((log, i) => (
          <li key={i} style={{ marginBottom: 4 }}>
            <span style={{ fontFamily: "monospace", opacity: 0.6 }}>
              [{new Date(log.ts).toLocaleTimeString()}]
            </span>{" "}
            <span
              style={{
                fontWeight: 600,
                color:
                  log.level === "error"
                    ? "#c00"
                    : log.level === "warn"
                      ? "#d97706"
                      : "#2563eb",
              }}
            >
              {log.level}
            </span>{" "}
            <span style={{ opacity: 0.7 }}>{log.source ?? "main"}</span> —{" "}
            {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
