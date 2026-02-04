// electron/identity.ts
import fs from "fs";
import path from "path";
import crypto from "crypto";


const IDENTITY_PATH = path.join(
  process.env.HOME || process.env.USERPROFILE || "",
  ".pact",
  "identity.json"
);

function ensureIdentity() {
  if (!fs.existsSync(IDENTITY_PATH)) {
    fs.mkdirSync(path.dirname(IDENTITY_PATH), { recursive: true });

    const identity = {
      userId: crypto.randomUUID(),
      displayName: "Anonymous",
    };

    fs.writeFileSync(IDENTITY_PATH, JSON.stringify(identity, null, 2));
  }
}

function readIdentity() {
  ensureIdentity();
  return JSON.parse(fs.readFileSync(IDENTITY_PATH, "utf-8"));
}

function writeIdentity(identity) {
  fs.writeFileSync(IDENTITY_PATH, JSON.stringify(identity, null, 2));
}

export function getIdentity() {
  return readIdentity();
}

export function setDisplayName(name) {
  const identity = readIdentity();
  identity.displayName = name;
  writeIdentity(identity);
  return identity;
}
