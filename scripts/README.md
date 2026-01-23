## Running Proto3 (Fake Supervisor UI)

### 1. Install dependencies

npm install
npm install --save-dev electron
npm install --save-dev @types/react @types/react-dom

### 2. Generate repository structure

Dry-run (no changes):

node scripts/gen-structure.js

Apply (create missing files):

node scripts/gen-structure.js --apply

### 3. Start the application

npm run start
