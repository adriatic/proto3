# PACT Documentation

This directory contains the authoritative human documentation for the PACT project.

Documentation in PACT is not secondary, optional, or explanatory after the fact.
It is part of the system itself.

If a concept exists in code, it must exist here first.
If a directory exists in the repository, it must be explainable here.

---

## Core Idea

PACT is a supervised dual-surface workspace designed to integrate AI assistance
into software development without sacrificing safety, control, or accountability.

The system explicitly separates:
- Proposal from execution
- Convenience from correctness
- Experimentation from irreversibility

AI is treated as a collaborator that suggests changes, not an agent that acts.

---

## Design Principles

### 1. Safety Over Speed

PACT assumes mistakes will happen.

The system is designed so that mistakes are:
- Visible
- Reversible
- Understandable after the fact

Speed is valuable only if recovery is possible.

---

### 2. Explicit Intent Over Implicit Action

PACT avoids:
- Drag-and-drop mutations
- Ambiguous insertion points
- Automatic edits without confirmation

Every meaningful change must be previewed and explicitly approved.

---

### 3. Structure Encodes Meaning

Directories are created only when the underlying concept is stable.

If a concept is still evolving, it should live in documentation,
not in the filesystem.

This keeps the repository readable and resistant to entropy.

---

### 4. Documentation Lives With the System

PACT does not use a separate documentation platform.

Documentation lives inside the repository because:
- It evolves with the system
- It is versioned and reviewable
- It cannot drift out of sync

The repository itself is the documentation system.

---

## How to Use This Documentation

This documentation is not meant to be read once.

It is meant to be:
- Revisited
- Refined
- Used to resolve uncertainty

If behavior and documentation ever disagree,
the documentation is the place where the disagreement must be resolved.
