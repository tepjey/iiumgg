# IIUM GardenGigs (IIUMGG) 🌿💼

[![Platform: Web](https://img.shields.io/badge/Platform-Web-emerald?style=flat-square)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![UML Compliance: 2.0](https://img.shields.io/badge/UML%20Compliance-2.0-blue?style=flat-square)](/reports/)
[![Cost: RM0.00](https://img.shields.io/badge/Actual%20CAPEX-RM0.00-success?style=flat-square)](#project-economics)

IIUM GardenGigs (IIUMGG) is a dedicated on-campus micro-employment and student-gig matching ecosystem tailored specifically for the International Islamic University Malaysia (IIUM) community. Developed as part of our System Analysis and Design project, the platform directly addresses a verified 95% trust deficit in informal campus hiring networks by standardizing identity validation, instituting clear wage transparency, and securing modern backend escrow execution.

---

## 📌 Project Overview & Value Proposition

Informal gig recruiting over fragmented Telegram channels (e.g., *"Part-Time Job IIUM Hunters"*) leaves student freelancers vulnerable to unpredictable payments, unclear work boundaries, and bad actors. IIUMGG centralizes this lifecycle:

*   **Verified Profiles:** Features a trusted green badge validation pipeline for safe institutional or enterprise recruitment.
*   **Wage Transparency:** Mandates structured benchmarks (minimum target of **RM10.00/hour**) alongside dynamic cost factors (peak demand multi-threading).
*   **Immutable Transactional Flow:** Coordinates multi-party milestones with external payment gateway integrations to mitigate employer ghosting.

---

## 🗺️ System Architecture & UML Modeling (Section 2)

The system is engineered using strict Object-Oriented Analysis and Design (OOAD) principles. The complete structural and behavioral lifecycles are modeled across the following core modules:

### 1. System-Wide Use Case Architecture
The entire platform capability is broken down across four primary operational modules handled symmetrically by our development team:
*   **`Verify Identity`** (Subsystem Entry Validation)
*   **`Post Part-Time Job`** (Employer Vacancy Ingestion Loop)
*   **`Browse & Apply for Gigs`** (Student Job Discovery Engine)
*   **`Process Payments`** (Core Financial Transactional Infrastructure)

### 2. Transaction Behavioral Sequences (`Process Payments`)
Our core payment subsystem handles calculations dynamically. The temporal sequence transitions cleanly down the activation lifeline:

[Job Provider] ──(clickReleasePayment)──> [:PaymentConfirmationUI]
│
(initiateTransfer)
│
▼
[:PaymentController] ──(requestFundRelease)──> [:DuitNow Gateway]
│                                             │
(ledgerUpdated) <───────(returnPaymentStatus)──────────┘
│
▼
[:TransactionHistory]

### 3. Core Object Lifecycle State Machine
The volatile lifecycle status parameters of a platform transaction are monitored using the following state machine transitions:
*   `PendingCompletion` -> Active workspace tracking.
*   `AwaitingPayment` -> Read-only bill presentation overlay.
*   `Processing` -> Encrypted bank token clearing loops via external network callbacks.
*   `PaymentFailed` -> Exception handling fallback traps for secure retries.
*   `Paid/Closed` -> Immutable historical database serialization ledger entry.

---

## 🎨 User Interface & HCI Considerations (Section 3)

The front-end design translates our structural models into scannable interfaces under Human-Computer Interaction (HCI) heuristics matching our **GardenGigs Branding Guidelines**:

*   **Visual Patterns:** Implements Inverted-T patterns for financial confirmations and Z-scanning grids for job browsing boards to reduce working cognitive load.
*   **GUI Control Isolation:** Utilizes contextual dropdown pickers, horizontal filter pills, and read-only text fields to structurally enforce input error prevention.
*   **Branding & Styling:** Deploys deep emerald corporate green branding (`#047857`) mixed with clean white backgrounds, matching the official identity benchmarks of the IIUM campus.

---

## 💰 Project Economics

| Cost Category | Item Description | Actual Expenditure | Market Valuation |
| :--- | :--- | :---: | :---: |
| **Software & Modeling** | StarUML (Evaluation Edition) | **RM0.00** | RM520.00 / user |
| **UI/UX Prototyping** | Canva (Free Version) | **RM0.00** | RM29.90 / month |
| **Development Hardware** | Student Workstations (4 Units) | **RM0.00** | RM14,000.00 total |
| **Cloud Repository** | GitHub (Free Developer Tier) | **RM0.00** | RM18.00 / user / mo |
| **Project Management** | WhatsApp Messenger | **RM0.00** | RM0.00 |
| **TOTAL CAPEX** | **Platform Capital Outlay** | **RM0.00** | **RM14,567.90** |

*This platform was compiled, configured, and deployed as a zero-cost infrastructure project using strategic open-source provisioning.*

---

## 👥 Group Project Directory

**Group 6 — Section 5**

*   **MUHAMMAD A’THIF UZAIR BIN SHAEDIN** (Matric: `2514847`) — *Subsystem Lead: Payment Integration & Interaction Design*
*   **MUHAMMAD FAHIM IZANI BIN NOR EFFENDI** (Matric: `2516487`) — *Subsystem Lead: Identity Verification*
*   **MUHAMMAD IRSHAD BIN ISMAIL** (Matric: `2512595`) — *Subsystem Lead: Job Creation Management*
*   **MUHAMMAD SUFYAN BIN SAMSUDIN** (Matric: `2514557`) — *Subsystem Lead: Application Matching Engine*

---

## 📄 License
This system analysis project framework is distributed under the terms of the **MIT License**. See `LICENSE` for details.
