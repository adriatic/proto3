export {};

declare global {
  interface PactIdentity {
    userId: string;
    displayName: string;
  }

  interface PactAPI {
    getIdentity(): PactIdentity;
    setDisplayName(name: string): PactIdentity;
  }

  interface Window {
    pact: PactAPI;
  }
}
