# Zenitrade

Zenitrade is a full-stack Indian-market **paper trading** project for the HCLTech workshop. It has persistent email/password accounts, a virtual wallet, 30 seeded Indian stocks, portfolio P&L, a ₹20 flat brokerage charge, technical/fundamental views, watchlist/IPO placeholders, and a responsive Angular interface.

> Demo only: deposits, withdrawals, and trades are simulated. No real money, payment, brokerage, or investment advice is provided.

## Requirements

- Java 21+
- Maven 3.9+
- Node.js 20+
- MySQL 8+ (or Docker Desktop)

## Run locally

1. Start MySQL (either run `docker compose up -d`, or create a MySQL database named `zenitrade`).
2. From `backend`, set `DB_USERNAME`, `DB_PASSWORD`, and a long `JWT_SECRET` if your MySQL credentials differ from the defaults.
3. Start the API:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
4. In a new terminal, start the UI:
   ```bash
   cd frontend
   npm install
   npm start
   ```
5. Visit `http://localhost:4200`, create an account, and begin paper trading.

## Demo walkthrough

1. Create an account; the server creates a real MySQL user row with a BCrypt password hash and ₹1,00,000 demo cash.
2. On Home, inspect indices and stock categories.
3. Click a trending stock, buy shares, and observe the ₹20 brokerage disclosed in the order ticket.
4. Open Holdings to show quantities, average price, current value, and the sell workflow.
5. Open Funds and demonstrate UPI/net-banking/card demo deposits and withdrawals.
6. Open Technical or Fundamental Analysis for stock-level indicators.

## Architecture

`Angular UI → JWT-protected Spring Boot REST API → JPA/Hibernate → MySQL`

The app deliberately separates the `market` and `trading` modules, so the seed data can be replaced by an authorized live-market feed later without changing the transaction logic.

## Notes for deployment

- Set a unique production `JWT_SECRET` (at least 32 characters).
- Set database credentials through environment variables, never source code.
- Run `npm run build` to produce `frontend/dist/`; deploy it via Nginx or copy it into Spring Boot static resources.
- Change the CORS origin in `SecurityConfig` to the deployed frontend domain.
