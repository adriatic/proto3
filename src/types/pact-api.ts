export interface PactIdentity {
  userId: string;
  displayName: string;
}

export interface PactAPI {
  getIdentity(): PactIdentity;
  setDisplayName(name: string): PactIdentity;
}
