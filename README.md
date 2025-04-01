

# Belvo Wallet

A responsive crypto wallet dashboard built with React, TypeScript and Material UI as part of the Belvo Frontend Code Challenge.

## 🌐 Live Demo

👉 [https://belvo-wallet-76yb.vercel.app](https://belvo-wallet-76yb.vercel.app)


## 🗺️ API Endpoints Map

Here’s a quick map of all the API endpoints used in this project:

| Endpoint                    | Method | Description                         |
|----------------------------|--------|-------------------------------------|
| `/login`                   | POST   | Authenticate user and return JWT    |
| `/wallet`                  | GET    | Retrieve wallet balances & transactions |
| `/wallet/send`             | POST   | Send cryptocurrency to another user |
| `/wallet/request`          | POST   | Request cryptocurrency from another user |

All requests are authenticated using the JWT token in the `Authorization` header as a `Bearer` token.

Authorization: Bearer <your_token_here>

## 🗂️ Project Structure

BELVO-WALLET/ ├── public/ │ └── index.html ├── src/ │ ├── assets/ │ ├── components/ │ │ ├── RequestCryptoForm.tsx │ │ ├── SendCryptoForm.tsx │ │ └── WalletChart.tsx │ ├── contexts/ │ │ └── AuthContext.tsx │ ├── img/ │ │ ├── login.png │ │ ├── wallet-1.png │ │ └── wallet-2.png │ ├── pages/ │ │ ├── Login.tsx │ │ └── WalletPage.tsx │ ├── services/ │ │ ├── auth.ts │ │ └── wallet.ts │ ├── utils/ │ │ └── isTokenExpired.ts │ ├── App.tsx │ ├── main.tsx │ └── vite-env.d.ts ├── .env ├── .gitignore ├── index.html ├── package.json ├── tsconfig.json └── vite.config.ts

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


## 🚀 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI (MUI)](https://mui.com/)
- [Recharts](https://recharts.org/)
- [JWT Decode](https://github.com/auth0/jwt-decode)

## 📸 Screenshots


![Login](https://github.com/joaodadas/BELVO-WALLET/blob/main/src/img/login.png?raw=true)


![Wallet Overview](https://github.com/joaodadas/BELVO-WALLET/blob/main/src/img/wallet-1.png?raw=true)


![Wallet Transactions](https://github.com/joaodadas/BELVO-WALLET/blob/main/src/img/wallet-2.png?raw=true)


# Made by João Vitor Dadas 
- [My personal website](https://joaodadas.com.br)

