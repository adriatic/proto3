import { useEffect, useState } from "react";
import { rendererLog } from "@/ui/supervisor/rendererLog";

// UI defaults (authoritative for now)
const DEFAULT_USER_ID = "local-user";
const DEFAULT_DISPLAY_NAME = "Anonymous";

export function IdentityPanel() {
  const [userId, setUserId] = useState<string>(DEFAULT_USER_ID);
  const [displayName, setDisplayName] = useState<string>(DEFAULT_DISPLAY_NAME);

  useEffect(() => {
    if (!window.pact) {
      console.error("window.pact is missing — preload not running");
      return;
    }

    const identity = window.pact.getIdentity();

    const resolvedUserId =
      identity?.userId && identity.userId.trim() !== ""
        ? identity.userId
        : DEFAULT_USER_ID;

    const resolvedDisplayName =
      identity?.displayName && identity.displayName.trim() !== ""
        ? identity.displayName
        : DEFAULT_DISPLAY_NAME;

    setUserId(resolvedUserId);
    setDisplayName(resolvedDisplayName);

    // rendererLog("info", "PACT identity loaded", {
    //   resolvedUserId,
    //   resolvedDisplayName,
    // });
  }, []);

  function onBlur() {
    if (!window.pact) return;

    const updated = window.pact.setDisplayName(displayName);

    // Defensive again — never allow undefined into state
    setDisplayName(
      updated?.displayName && updated.displayName.trim() !== ""
        ? updated.displayName
        : DEFAULT_DISPLAY_NAME
    );

    // rendererLog("info", "PACT identity updated", updated);
  }

  const isDefaultIdentity =
    userId === DEFAULT_USER_ID &&
    displayName === DEFAULT_DISPLAY_NAME;

  return (
    <section>
      <h3>Identity</h3>

      {isDefaultIdentity && (
        <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
          Using default identity
        </div>
      )}

      <div>
        <strong>User ID:</strong>
        <div style={{ fontFamily: "monospace" }}>{userId}</div>
      </div>

      <label>
        Display name:
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          onBlur={onBlur}
          style={{ marginLeft: 8 }}
        />
      </label>
    </section>
  );
}
