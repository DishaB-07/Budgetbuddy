# 💰BudgetBuddy💰

A personal finance manager built with React, Node.js, Express and MongoDB. Track your income and expenses, set monthly budgets, and get a clear picture of where your money goes.

---

## Features

- JWT-based login and registration
- Add, edit, delete income and expense transactions
- Set monthly budgets per category with over-budget alerts
- Dashboard with live KPI cards, 6-month trend chart and donut chart
- Analytics page with category breakdown and savings insights
- CSV export for transactions
- Fully responsive — works on mobile, tablet and desktop

---

## Tech Stack

| Layer    | Tech                        |
|----------|-----------------------------|
| Frontend | React, Axios, custom SVG charts |
| Backend  | Node.js, Express.js         |
| Database | MongoDB + Mongoose          |
| Auth     | JWT + bcryptjs              |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/DishaB-07/budgetbuddy.git
cd budgetbuddy
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/budgetbuddy
JWT_SECRET=your_secret_key_here
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
npm start
```

The app runs at `http://localhost:3000`

---

## API Endpoints

### Auth — `/api/auth`

| Method | Route       | Description        | Auth |
|--------|-------------|--------------------|------|
| POST   | /register   | Create account     | No   |
| POST   | /login      | Login, get token   | No   |
| GET    | /me         | Get logged-in user | Yes  |

### Transactions — `/api/transactions`

| Method | Route          | Description             | Auth |
|--------|----------------|-------------------------|------|
| GET    | /              | Get all transactions    | Yes  |
| GET    | /summary       | Monthly income/expense  | Yes  |
| POST   | /              | Add transaction         | Yes  |
| PUT    | /:id           | Update transaction      | Yes  |
| DELETE | /:id           | Delete transaction      | Yes  |

### Budgets — `/api/budgets`

| Method | Route  | Description               | Auth |
|--------|--------|---------------------------|------|
| GET    | /      | Get budgets (filter month)| Yes  |
| POST   | /      | Set/update a budget       | Yes  |
| DELETE | /:id   | Remove a budget           | Yes  |

---

## Folder Structure

```
budgetbuddy/
├── server/
│   ├── config/         # DB connection
│   ├── controllers/    # Route logic
│   ├── middleware/     # JWT auth check
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routers
│   └── index.js
│
└── client/
    └── src/
        ├── components/ # Navbar, modals, UI kit
        ├── context/    # Auth context
        ├── pages/      # Dashboard, Transactions, Budgets, Analytics
        └── utils/      # Axios instance, helpers
```

---

## Environment Variables

| Variable   | Description                  |
|------------|------------------------------|
| PORT       | Port for Express server      |
| MONGO_URI  | MongoDB connection string    |
| JWT_SECRET | Secret key for signing JWTs  |

> Never commit your `.env` file. It is listed in `.gitignore`.

---

## License

MIT
