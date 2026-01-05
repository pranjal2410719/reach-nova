# 🚀 ReachNova — Civic Campaign Discovery Platform (Flutter)

ReachNova is a **Flutter-based Android application** that centralizes government schemes, NGO initiatives, CSR programs, and civic campaigns into a single, clean, and accessible mobile experience for citizens.

The platform is built for **clarity, participation tracking, and real-world deployment** — not social noise or vanity engagement.

---

## 📌 Problem Statement

Civic campaigns and government schemes are scattered across dozens of websites, PDFs, and portals.  
Most eligible citizens never discover them, while institutions lack reliable participation data.

**ReachNova solves this by:**
- Aggregating campaigns into one app
- Matching users with relevant opportunities
- Tracking real participation
- Converting engagement into actionable insights

---

## 🎯 Core Features

- 📍 Centralized campaign discovery (Government, NGO, CSR)
- 🔍 Smart filters (location, eligibility, category, deadlines)
- 🔔 Push notifications for relevant campaigns
- 📝 One-tap campaign registration
- 📊 Participation tracking & analytics
- 🌗 Light & Dark mode support
- 🔐 Secure authentication (Supabase)

---

## 🛠️ Tech Stack

**Frontend**
- Flutter (Android)
- Dart
- Material 3

**Backend & Services**
- Supabase (Auth, Database, Storage)
- REST APIs

**State Management**
- Provider / Riverpod / Bloc (based on implementation)

---

## 🏗️ Project Architecture

```text
lib/
├── core/           # constants, themes, utilities
├── data/           # models, repositories, services
├── features/       # auth, campaigns, profile modules
├── presentation/   # screens & reusable widgets
├── routes/         # navigation & guards
└── main.dart       # entry point
