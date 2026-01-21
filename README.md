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
