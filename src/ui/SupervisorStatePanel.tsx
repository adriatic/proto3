// src/ui/SupervisorStatePanel.tsx

import React from "react";
import { SupervisorState } from "../supervisor/FakeSupervisor";

type Props = {
  state: SupervisorState;
  lastAction: string;
};

export const SupervisorStatePanel: React.FC<Props> = ({ state, lastAction }) => {
  return (
    <div style={{
      border: "1px solid #444",
      padding: "12px",
      marginBottom: "12px",
      fontFamily: "monospace",
      background: "#111",
      color: "#ddd"
    }}>
      <div><strong>Supervisor State</strong></div>
      <div style={{ marginTop: "8px" }}>
        <div>Current: <span style={{ color: "#6cf" }}>{state}</span></div>
        <div>Last action: <span style={{ color: "#fc6" }}>{lastAction}</span></div>
      </div>
    </div>
  );
};
