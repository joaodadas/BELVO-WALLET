
# 💼 Belvo Wallet - Frontend Challenge V2

Este projeto é a implementação do desafio técnico fornecido pela Belvo. A aplicação consiste em uma carteira de criptomoedas que permite visualizar saldo, transações recentes, enviar e solicitar criptomoedas entre contatos.

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [FastAPI (API fornecida via Docker)](https://fastapi.tiangolo.com/)

## ✅ Funcionalidades Implementadas

- [x] Autenticação via JWT
- [x] Armazenamento seguro do token no localStorage
- [x] Redirecionamento automático após login
- [x] Visualização do saldo de criptomoedas (BTC, ETH, DOGE)
- [x] Listagem de transações recentes
- [x] Envio de criptomoedas para contatos
- [x] Solicitação de criptomoedas (extra)
- [x] Tema escuro com layout responsivo e estilizado com Material UI

## 📦 Como rodar o projeto

### Pré-requisitos

- Node.js (v18+)
- Docker (para rodar a API)

### Instalação

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/belvo-wallet.git
cd belvo-wallet

# Instale as dependências
npm install
```

### Rodar a API (Docker)

```bash
docker compose up --build
# A API estará disponível em: http://localhost:8000
```

### Rodar o Frontend

```bash
npm run dev
# A aplicação estará disponível em: http://localhost:5173
```

## 🧪 Usuários de Teste

Utilize as credenciais abaixo para testar o login:

```txt
username: vicky
password: secret
```

## 📁 Estrutura de Pastas

```
src/
├── components/         # Componentes reutilizáveis
├── contexts/           # Contexto de autenticação
├── pages/              # Telas principais (Login e Wallet)
├── routes/             # Rotas protegidas
├── services/           # Integração com a API
├── App.tsx             # Rotas principais
├── main.tsx            # Ponto de entrada
```

## 📷 Prints da Interface

<em>Adicione aqui capturas de tela das páginas Login e Wallet.</em>

## ✨ Melhorias Futuras

- Animações de carregamento mais suaves
- Toasts com feedback visual para erros e sucesso
- Exibição das solicitações pendentes de criptomoeda
- Deploy na Vercel (opcional)

---
.
