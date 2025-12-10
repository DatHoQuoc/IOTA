# Decentralized Mood Board on IOTA

A decentralized application (dApp) running on the IOTA Testnet that allows users to submit their current mood. The system aggregates these votes in real-time on-chain using a Shared Object and logs interactions via blockchain events.

This project was built to satisfy **Requirement #19: Decentralized Mood Board**.

## 🚀 Features
- **Decentralized State:** Mood counts are stored in a Shared Object on the blockchain, not a centralized database.
- **Aggregation:** Automatically counts interactions for specific mood types (Happy, Neutral, Sad).
- **Event Logging:** Emits a `MoodSubmitted` event on-chain for every transaction.
- **Wallet Integration:** Supports IOTA wallets via `@iota/dapp-kit`.

---

## 🛠️ Project Structure

The project is a monorepo divided into the Smart Contract (backend) and the Frontend.

```bash
iota-mood-board/
├── move_contracts/           # IOTA Smart Contract (Move Language)
│   ├── Move.toml             # Manifest file for dependencies
│   └── sources/
│       └── mood_board.move   # Main contract logic (Shared Object & Entry functions)
│
└── frontend/                 # Next.js Application (React + TypeScript)
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx    # Root layout with IOTA Providers
    │   │   ├── page.tsx      # Main UI and Transaction logic
    │   │   └── providers.tsx # Configuration for IotaClient and WalletProvider
    │   └── lib/
    │       └── constants.ts  # Stores Package ID and Shared Object ID
    ├── package.json
    └── tailwind.config.ts
⚙️ Setup & Run Guide
Prerequisites
Node.js (v18 or later)

IOTA CLI installed and configured for Devnet or Testnet.

An IOTA Wallet extension installed in your browser.

Step 1: Deploy the Smart Contract
Navigate to the contract folder:

Bash

cd move_contracts
Publish the package to the IOTA network:

Bash

iota client publish --gas-budget 100000000
Important: Copy the following two IDs from the transaction output:

Package ID (Owner: Immutable)

Mood Board ID (Owner: Shared)

Step 2: Configure the Frontend
Navigate to the frontend folder:

Bash

cd ../frontend
Open src/lib/constants.ts.

Paste your specific IDs into the constants:

TypeScript

export const PACKAGE_ID = '0x...'; // Your Immutable Package ID
export const MOOD_BOARD_ID = '0x...'; // Your Shared Object ID
Step 3: Run the Application
Install dependencies:

Bash

npm install
Start the development server:

Bash

npm run dev
Open your browser and visit: http://localhost:3000

🧠 Technical Explanation
This dApp implements the Shared Object pattern to achieve decentralized aggregation.

1. The Smart Contract (mood_board.move)
Data Structure (Aggregation): We define a struct MoodBoard that has key and store abilities. It contains u64 fields for each mood type.

Rust

public struct MoodBoard has key, store {
    id: UID,
    happy_count: u64,
    neutral_count: u64,
    sad_count: u64,
}
Shared Object Pattern: In the init function, we use transfer::share_object(board). This makes the object accessible to anyone. Unlike "Owned Objects" which only the owner can modify, a "Shared Object" allows multiple users to send transactions to modify the state (increment counts) simultaneously.

Event Emission: Every time submit_mood is called, the contract emits a MoodSubmitted event. This serves as an immutable log of activity that can be indexed by off-chain indexers.

Rust

event::emit(MoodSubmitted { user: tx_context::sender(ctx), mood_type: mood });
2. The Frontend Integration
Connection: We use IotaClientProvider and WalletProvider to handle wallet connections and network configuration.

Execution: When a user clicks a mood button, we construct a Programmable Transaction Block (PTB) using the IOTA SDK.

Move Call: The frontend targets the specific function on-chain:

TypeScript

tx.moveCall({
  target: `${PACKAGE_ID}::mood_board::submit_mood`,
  arguments: [
    tx.object(MOOD_BOARD_ID), // Pass the shared object
    tx.pure.u8(moodIndex),    // Pass the user's choice
  ],
});