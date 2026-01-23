export function App() {
  const ping = async () => {
    const res = await (window as any).api.pingMain({ hello: "renderer" });
    console.log("[renderer] reply:", res);
    alert("IPC OK — check terminal & DevTools console");
  };

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>PACT Proto3</h1>
      <button onClick={ping}>Ping main</button>
    </div>
  );
}
