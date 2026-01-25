import { useEffect, useState } from "react";

export interface SupervisorLog {
  ts: number;
  level: "info" | "warn" | "error";
  message: string;
  source: "main" | "renderer" | "supervisor";
  meta?: Record<string, unknown>;
}

export function useSupervisorLogs() {
  const [logs, setLogs] = useState<SupervisorLog[]>([]);

  useEffect(() => {
    const api = (window as any).supervisor;
    if (!api) return;

    api.onLog((entry: SupervisorLog) => {
      setLogs((prev) => [...prev.slice(-200), entry]);
    });
  }, []);

  return logs;
}
