// src/supervisor/FakeSupervisor.ts

export type SupervisorState =
  | "Idle"
  | "ContextPrepared"
  | "ProposalReceived"
  | "PreviewConstructed"
  | "AwaitingConfirmation"
  | "ApplyingChange"
  | "Applied"
  | "Undoing"
  | "Error";

type Listener = (state: SupervisorState, lastAction: string) => void;

export class FakeSupervisor {
  private state: SupervisorState = "Idle";
  private lastAction = "init";
  private listeners: Listener[] = [];

  subscribe(fn: Listener) {
    this.listeners.push(fn);
    fn(this.state, this.lastAction);
  }

  private transition(action: string, next: SupervisorState) {
    this.lastAction = action;
    this.state = next;
    this.listeners.forEach(l => l(this.state, this.lastAction));
    console.log(`[Supervisor] ${action} → ${next}`);
  }

  private assert(expected: SupervisorState | SupervisorState[]) {
    const ok = Array.isArray(expected)
      ? expected.includes(this.state)
      : this.state === expected;

    if (!ok) {
      this.transition("illegalTransition", "Error");
      throw new Error(`Illegal transition from ${this.state}`);
    }
  }

  submitProposal() {
    this.assert(["Idle", "ContextPrepared"]);
    this.transition("submitProposal", "ProposalReceived");
  }

  constructPreview() {
    this.assert("ProposalReceived");
    this.transition("constructPreview", "PreviewConstructed");
  }

  requestConfirmation() {
    this.assert("PreviewConstructed");
    this.transition("requestConfirmation", "AwaitingConfirmation");
  }

  confirmApply() {
    this.assert("AwaitingConfirmation");
    this.transition("confirmApply", "ApplyingChange");
    this.transition("applyChange", "Applied");
  }

  cancelApply() {
    this.assert("AwaitingConfirmation");
    this.transition("cancelApply", "Idle");
  }

  undoLastChange() {
    this.assert("Applied");
    this.transition("undoLastChange", "Undoing");
    this.transition("undoComplete", "Idle");
  }

  getState() {
    return this.state;
  }
}
