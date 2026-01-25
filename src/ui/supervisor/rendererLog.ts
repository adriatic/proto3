export function rendererLog(
  level: "info" | "warn" | "error",
  message: string,
  meta: Record<string, unknown> = {}
) {
  const api = (window as any).supervisor;
  if (!api?.logFromRenderer) return;

  api.logFromRenderer({
    level,
    message,
    meta,
    ts: Date.now(),
  });
}
