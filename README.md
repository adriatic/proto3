# PACT

PACT is a supervised workspace for safely evolving software with the assistance of AI.

This repository intentionally starts with **structure and intent**, not runnable code.
Nothing here is accidental. Nothing here is provisional without being labeled as such.

If you are looking for an app to run, you are early.
If you are looking for a system you can trust, you are in the right place.

---

## What PACT Is

PACT is built around a simple but strict separation:

- **CODE** represents the authoritative project state
- **AI** may propose changes, but never apply them
- **Supervisor** is the only authority allowed to mutate project state

All meaningful changes are:
- Previewed
- Attributable
- Reversible

Undo in PACT refers to **project-state undo**, not editor keystrokes.

---

## What PACT Is Not

PACT is deliberately not:
- A text editor
- A code generator
- A replacement for VS Code or other IDEs
- A shortcut around understanding software

PACT exists to make *experimentation safe*, not effortless.

---

## Why This Repository Looks Empty

The repository starts small on purpose.

Before introducing code, frameworks, or runtimes, PACT establishes:
- A clear mental model
- A reproducible filesystem structure
- Documentation that explains intent, not mechanics

This prevents early mistakes from becoming permanent architecture.

---

## How to Explore This Repository

Start with:
- `docs/README.md` — the conceptual foundation
- `structure/README.md` — how filesystem shape is defined
- `scripts/README.md` — what automation is allowed (and what is not)

You should understand **why PACT exists** before you see how it is implemented.

That ordering is intentional.

## Development: Running & Stopping the App (React + Electron)

This project runs two coordinated processes in development:

Vite / React – the renderer (UI)

Electron – the desktop host (main process)

They are supervised so they can be started and stopped deterministically.

### Prerequisites

From the project root: `npm install`

### Starting the app (recommended way): `npm run dev`

This does the following:

- Starts the Vite dev server (React)

- Waits until http://localhost:5173 is available

- Starts Electron, loading the Vite dev server

- Keeps both processes under a single supervisor

You should see:

- Vite logs in the terminal

- An Electron window opening with the React UI

### Stopping the app (clean shutdown)

There are two correct ways to stop the app.

#### Option 1 — Close the Electron window (preferred)

- Close the Electron GUI window

- Electron quits deterministically

- The supervising Node process exits

- Control returns to the terminal

This is the normal shutdown path and does not rely on signals or terminal focus.

#### Option 2 — Ctrl-C in the terminal (fallback)

1. Make sure the terminal window has focus

2. Press Ctrl-C

Result:

- The supervisor receives SIGINT

- Electron is terminated cleanly

- Vite is stopped

- Terminal prompt returns

Note: Ctrl-C is a fallback mechanism. The app is designed to shut down cleanly when the Electron window is closed.

### ⚠️ What not to do

- ❌ Do not hunt for PIDs

- ❌ Do not use killall Electron

- ❌ Do not rely on Activity Monitor

- ❌ Do not leave Electron running headless

If shutdown does not behave as described above, it is a bug and should be fixed in the supervisor or lifecycle code.

### 🔍 Running components individually (advanced / debugging)
#### React (Vite) only
`npm run dev:vite`


Starts the renderer at:

`http://localhost:5173`


No Electron window is involved.

#### Electron only (expects Vite already running)
`npm run dev:electron`


Use this only if:

- Vite is already running

- You are debugging Electron behavior specifically

### 🧠 Design note (important)

This project intentionally avoids:

- detached Electron processes

- OS-specific lifecycle conventions

- reliance on terminal focus for correctness

The Electron app **always quits** when its window is closed, regardless of platform.

┌──────────────────────────────────────────┐
│              Electron Main               │
│                                          │
│  win.loadURL("http://localhost:5173")    │
│               │                          │
│               ▼                          │
│        Vite Dev Server (5173)             │
└────────────────┬─────────────────────────┘
                 │ HTTP
                 ▼
┌──────────────────────────────────────────┐
│              index.html                  │
│                                          │
│  <div id="root"></div>                   │
│  (static, no JS logic)                   │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────┐
│              index.tsx                   │
│                                          │
│  ReactDOM.createRoot(...).render(<App />)│
│  (bootstrap only, runs once)             │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────┐
│                <App />                   │
│                                          │
│  - Renderer session starts               │
│  - Session-level effects                 │
│  - Correct place for:                    │
│      rendererLog("Renderer mounted")     │
│                                          │
│  Child components mount below this       │
└──────────────────────────────────────────┘

