from pathlib import Path
from zipfile import ZipFile

# Conteúdo do README.md
readme_content = """# 💸 Belvo Wallet – Frontend Code Challenge (V2)

A responsive crypto wallet dashboard built with React, TypeScript and Material UI as part of the Belvo Frontend Code Challenge.

## 🌐 Live Demo

👉 [https://belvo-wallet-76yb.vercel.app](https://belvo-wallet-76yb.vercel.app)

---

## 📸 Screenshots

_Add screenshots here: login screen, wallet dashboard, transactions, mobile view, etc._

---

## ✅ Features

- 🔐 User login with JWT token (with expiration control)
- 👤 Contacts list for sending/requesting crypto
- 📤 Send cryptocurrency
- 📥 Request cryptocurrency
- 💼 View balances (BTC, ETH, DOGE)
- 📊 Portfolio chart with historical data
- 📃 Transaction history with status and timestamp
- ⚠️ Auto logout on token expiration
- 🌙 Dark theme interface
- 📱 Responsive layout (mobile-friendly)

---

## 🚀 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI (MUI)](https://mui.com/)
- [Recharts](https://recharts.org/)
- [JWT Decode](https://github.com/auth0/jwt-decode)

---

## 🧪 Test Credentials

Use these to log in (provided by the challenge API):

