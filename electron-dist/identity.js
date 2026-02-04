"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdentity = getIdentity;
exports.setDisplayName = setDisplayName;
// electron/identity.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const IDENTITY_PATH = path_1.default.join(process.env.HOME || process.env.USERPROFILE || "", ".pact", "identity.json");
function ensureIdentity() {
    if (!fs_1.default.existsSync(IDENTITY_PATH)) {
        fs_1.default.mkdirSync(path_1.default.dirname(IDENTITY_PATH), { recursive: true });
        const identity = {
            userId: crypto_1.default.randomUUID(),
            displayName: "Anonymous",
        };
        fs_1.default.writeFileSync(IDENTITY_PATH, JSON.stringify(identity, null, 2));
    }
}
function readIdentity() {
    ensureIdentity();
    return JSON.parse(fs_1.default.readFileSync(IDENTITY_PATH, "utf-8"));
}
function writeIdentity(identity) {
    fs_1.default.writeFileSync(IDENTITY_PATH, JSON.stringify(identity, null, 2));
}
function getIdentity() {
    return readIdentity();
}
function setDisplayName(name) {
    const identity = readIdentity();
    identity.displayName = name;
    writeIdentity(identity);
    return identity;
}
