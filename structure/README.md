# Structure Definition

This directory defines the authoritative filesystem structure
for the PACT repository.

The file `pact.structure.json` is the single source of truth.

---

## Why Structure Is Declarative

PACT treats filesystem structure as a deliberate design artifact,
not an emergent byproduct of development.

By defining structure declaratively:
- The repository can be safely regenerated
- Accidental complexity is avoided
- Intent remains visible over time

Structure changes are intentional acts, not side effects.

---

## What Belongs in the Structure File

The structure definition may describe:
- Directories that must exist
- Files that must exist
- Minimal placeholder content

It must not encode:
- Behavior
- Framework assumptions
- Runtime decisions

Those belong elsewhere, and later.

---

## Relationship to Scripts

Scripts in `scripts/` may read the structure definition
to verify or create missing elements.

The structure file is authoritative.
Scripts must never infer or extend it.

If the structure needs to change,
the structure file changes first.

---

## Stability Expectation

Changes to the structure definition are rare and deliberate.

If structure changes frequently, it is a signal that
the underlying concepts are not yet stable
and should remain in documentation instead.
