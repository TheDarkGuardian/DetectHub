# 🛡️ DetectHub — Digital Forensics & Computer Integrity Platform

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![Tauri v2](https://img.shields.io/badge/Tauri-v2.0-blue?logo=tauri)](https://tauri.app/)
[![Rust](https://img.shields.io/badge/Rust-2021-orange?logo=rust)](https://www.rust-lang.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**DetectHub** is an enterprise-grade **Digital Forensics & Computer Integrity SaaS Platform** designed for gaming communities, esports organizations, security auditors, and system administrators. It replaces legacy, intrusive PC checks with a professional workflow powered by transparent system telemetry, automated risk scoring, and AI-assisted forensic synthesis.

> ⚠️ **Important Notice**: DetectHub is **NOT** anti-cheat software, malware, or spyware. It operates 100% on explicit user consent and transparent, non-intrusive artifact inspection.

---

## 📸 Architecture Overview

```mermaid
graph TD
    subgraph Desktop Agent - Tauri v2 + Rust
        A[React 19 UI Frontend] <-->|Tauri IPC Commands| B[Tauri Core Engine]
        B --> C[Modular Scanner Pipeline]
        C --> C1[System & Specs Scanner]
        C --> C2[Process & Signature Scanner]
        C --> C3[Kernel Driver Scanner]
        C --> C4[Registry & Autoruns Scanner]
        C --> C5[USB History Scanner]
        C --> C6[Network & DNS Cache Scanner]
        C --> C7[Defender & Security Event Logs]
        D[Encryption & Packaging] -->|AES-256 GCM Payload| E[Web SaaS Backend API]
    end

    subgraph Web SaaS Platform - Next.js 15
        E --> F[API Router / REST Controllers]
        F --> G[Configurable Risk Engine]
        F --> H[DetectAI Forensic Analyst]
        F --> I[Prisma DB Store]
        J[Web Dashboard UI] <--> F
    end
```

---

## 🔥 Key Products & Applications

### 1. DetectHub Agent (Windows Desktop)
- **Tech Stack**: Tauri v2, Rust 2021, React 19, TypeScript, Tailwind CSS, shadcn/ui.
- **Features**:
  - One-time scan token & invite pairing (`DETECT-8921-X992`).
  - Animated radial progress ring indicator.
  - Live streaming terminal log viewer.
  - AES-256 encrypted payload packaging & automated background upload queue.

### 2. DetectHub Web Dashboard (SaaS Platform)
- **Tech Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Prisma, Recharts.
- **Design System**: Linear/Vercel/Raycast pure dark mode aesthetic (`#09090B`), status-only accents (`#22C55E` Safe, `#EAB308` Review, `#EF4444` Critical, `#3B82F6` Info), keyboard command palette (`Cmd+K`).
- **Features**:
  - **Forensic Dashboard (`/dashboard`)**: Scan volume KPIs, live security event stream, trend graphs.
  - **Single Report Inspector (`/reports/[id]`)**: Risk Score Gauge, DetectAI Analyst Q&A, Interactive Chronology Timeline, 25+ Category Artifact Explorer with raw JSON modal.
  - **Configurable Risk Engine (`/rules`)**: Admin weight editor for custom detection rules.
  - **Scan Requests (`/scans`)**: One-time invite tokens, permanent URLs, QR code access credentials.
  - **Multi-Tenant Organizations (`/organizations`)**: RBAC roles, brand accents, Discord webhook integration.

---

## ⚡ Quick Start & Installation

### Prerequisites
- [Node.js 20+](https://nodejs.org/)
- [npm 10+](https://www.npmjs.com/)
- [Rust & Cargo](https://rustup.rs/) (Optional for native Tauri desktop packaging)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/TheDarkGuardian/DetectHub.git
cd DetectHub
npm install
```

### 2. Run Web SaaS Dashboard

```bash
cd apps/web
npm run dev
```
Open **`http://localhost:3000`** in your browser to access the Web Dashboard.

### 3. Run Desktop Agent UI

```bash
cd apps/agent
npm run dev
```
Open **`http://localhost:1420`** to inspect the Desktop Agent interface.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<p center="text-center">
  Crafted with precision for next-generation digital forensics.
</p>
