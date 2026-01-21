# Scripts

This directory contains scripts that support the structure and integrity
of the PACT repository.

Scripts in this directory are intentionally limited in scope.

---

## What Scripts Are Allowed to Do

Scripts may:
- Create missing directories
- Create placeholder files
- Validate repository structure
- Make drift visible

Scripts must be:
- Safe by default
- Explicit in behavior
- Idempotent

---

## What Scripts Are Not Allowed to Do

Scripts must not:
- Overwrite existing files
- Delete files or directories
- Build or run applications
- Install dependencies
- Modify code behavior

If a script can cause irreversible change,
it does not belong here.

---

## Philosophy

Automation in PACT exists to:
- Reduce accidental mistakes
- Increase confidence
- Preserve intent

Automation does not exist to be clever or convenient.

When in doubt, the system should ask a human to decide.
