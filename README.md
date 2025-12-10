# 🎭 Decentralized Mood Board on IOTA

A decentralized application (dApp) built on the IOTA EVM Testnet that enables users to submit and track collective mood data in real-time. The system aggregates mood submissions on-chain using Move smart contracts and provides transparent, immutable mood analytics.

**Project Requirement:** #19 - Decentralized Mood Board

[![IOTA Testnet](https://img.shields.io/badge/IOTA-Testnet-00E5FF?style=flat-square)](https://explorer.iota.org/)
[![Move](https://img.shields.io/badge/Move-Smart%20Contract-4A90E2?style=flat-square)](https://move-language.github.io/move/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square)](https://nextjs.org/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Smart Contract API](#smart-contract-api)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

The Decentralized Mood Board leverages blockchain technology to create a transparent, tamper-proof system for collecting and analyzing community sentiment. Unlike traditional centralized mood tracking systems, all data is stored on-chain, ensuring data integrity and user ownership.

### Live Demo
- **Smart Contract:** [View on IOTA Explorer](https://explorer.iota.org/object/0x5b28152abf111a6f229768ae49dcb3f33caf51bdeefd4821653003a6b42af1fa?network=testnet)
- **Network:** IOTA EVM Testnet

---

## ✨ Features

- **🔗 Decentralized State Management:** Mood counts stored in a Shared Object on-chain, eliminating single points of failure
- **📊 Real-Time Aggregation:** Automatic tallying of mood submissions (Happy, Neutral, Sad)
- **📝 Event Logging:** Emits `MoodSubmitted` events for complete transaction transparency
- **👛 Wallet Integration:** Seamless connection with IOTA wallets via `@iota/dapp-kit`
- **⚡ Responsive UI:** Built with Next.js and Tailwind CSS for optimal user experience
- **🔐 Blockchain Security:** Immutable records with cryptographic verification

---

## 🏗️ Architecture

This project employs modern dApp development patterns:

### Resource-Oriented Programming (Move)
The smart contract uses Move's resource model to ensure:
- Type-safe mood data structures
- Shared object patterns for concurrent access
- Event-driven architecture for transparency

### Client-Side State Management
- **TanStack Query (React Query):** Manages blockchain data fetching, caching, and synchronization
- **Optimistic Updates:** Provides immediate UI feedback while transactions confirm

### Component Architecture
- **Modular Design:** Reusable React components with TypeScript
- **Radix UI Primitives:** Accessible, unstyled components for custom design systems
- **Tailwind CSS:** Utility-first styling for rapid UI development

---

## 📁 Project Structure
```bash
iota-mood-board/
├── move_contracts/              # Smart Contract (Move Language)
│   ├── Move.toml                # Package manifest and dependencies
│   └── sources/
│       └── mood_board.move      # Main contract: Shared Object & entry functions
│
└── frontend/                    # Next.js Application
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx       # Root layout with IOTA Providers
    │   │   ├── page.tsx         # Main UI and transaction logic
    │   │   └── providers.tsx    # IotaClient and WalletProvider config
    │   └── lib/
    │       └── constants.ts     # Package ID and Shared Object ID
    ├── package.json
    ├── tailwind.config.ts
    └── tsconfig.json
```

---

## 🛠️ Technologies Used

### Blockchain Layer
- **IOTA Move:** Smart contract development and execution
- **IOTA EVM Testnet:** Deployment and testing environment

### Frontend Stack
- **Next.js 14:** React framework with App Router
- **TypeScript:** Type-safe development
- **Tailwind CSS:** Utility-first styling
- **@iota/dapp-kit:** IOTA wallet integration and React hooks
- **@radix-ui/themes:** Accessible UI component primitives
- **TanStack Query:** Asynchronous state management

### Development Tools
- **IOTA CLI:** Smart contract compilation and deployment
- **Vite:** Fast build tooling

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **IOTA CLI** ([Installation Guide](https://docs.iota.org/developer/getting-started/install-iota))
- **IOTA Wallet** (Browser extension for testnet)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/iota-mood-board.git
cd iota-mood-board
```

### 2. Smart Contract Deployment

Navigate to the Move contracts directory and deploy to IOTA Testnet:
```bash
cd move_contracts
iota move build
iota client publish --gas-budget 100000000
```

**Important:** Save the `Package ID` and `Shared Object ID` from the deployment output.

### 3. Frontend Configuration

Update the contract addresses in your frontend configuration:
```typescript
// frontend/src/lib/constants.ts
export const PACKAGE_ID = "0x<YOUR_PACKAGE_ID>";
export const SHARED_OBJECT_ID = "0x<YOUR_SHARED_OBJECT_ID>";
export const MODULE_NAME = "mood_board";
export const NETWORK = "testnet";
```

### 4. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Connect Your Wallet

- Install the IOTA Wallet browser extension
- Switch to IOTA Testnet
- Get testnet tokens from the [IOTA Faucet](https://evm-faucet.testnet.iotaledger.net/)
- Connect your wallet through the dApp interface

---

## 📜 Smart Contract API

The `mood_board` module exposes the following entry functions:

| Function | Parameters | Description |
|----------|------------|-------------|
| `submit_mood` | `mood: u8` | Submit a mood vote (0=Happy, 1=Neutral, 2=Sad) |
| `get_mood_count` | `mood: u8` | Query the current count for a specific mood |
| `get_all_counts` | - | Retrieve counts for all mood types |

### Events

- **`MoodSubmitted`**
  - `sender: address` - Wallet address of the voter
  - `mood: u8` - Mood type submitted
  - `timestamp: u64` - Block timestamp

---

## 🌐 Deployment

### Smart Contract Deployment
```bash
cd move_contracts
iota move build
iota client publish --gas-budget 100000000
```

### Frontend Deployment (Vercel)
```bash
cd frontend
npm run build
vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow TypeScript best practices
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [IOTA Foundation](https://www.iota.org/) for blockchain infrastructure
- [Move Language](https://move-language.github.io/move/) for smart contract capabilities
- [Radix UI](https://www.radix-ui.com/) for accessible components
- Rise In Cohort for project guidance

---

## 📞 Contact

For questions or support, please open an issue or reach out:

- **GitHub:** [@yourusername](https://github.com/yourusername)
- **Email:** your.email@example.com

---

<div align="center">

**Built with ❤️ on IOTA**

[Report Bug](https://github.com/yourusername/iota-mood-board/issues) · [Request Feature](https://github.com/yourusername/iota-mood-board/issues)

</div>

## Contract address
https://explorer.iota.org/object/0x5b28152abf111a6f229768ae49dcb3f33caf51bdeefd4821653003a6b42af1fa?network=testnet
<img width="1918" height="1096" alt="smart-contract" src="https://github.com/user-attachments/assets/a7ed8b3d-67d6-4c88-b6d2-56215dc20687" />

