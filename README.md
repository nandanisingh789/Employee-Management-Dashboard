# Employee Management Dashboard

A responsive, full-featured Employee Management Dashboard built with **React.js** and **Tailwind CSS**.

## Features

- JWT Authentication (via dummyjson.com API)
- Protected routes (redirect to login if not authenticated)
- Dashboard with stats cards & recent employees
- Employee listing with search, department filter, pagination & delete
- Add Employee form with full frontend validation & live preview
- Dark mode toggle (persisted in localStorage)
- Responsive sidebar + navbar (mobile hamburger menu)
- Toast notifications
- Loading spinners & smooth animations

## Demo Credentials

| Field    | Value         |
|----------|---------------|
| Username | `emilys`      |
| Password | `emilyspass`  |

---

## Project Structure

```
employee-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── context/
│   │   ├── AuthContext.js       # JWT auth state
│   │   ├── ThemeContext.js      # Dark mode
│   │   ├── EmployeeContext.js   # Employee CRUD state
│   │   └── ToastContext.js      # Toast notifications
│   ├── components/
│   │   └── DashboardLayout.js  # Sidebar + navbar shell
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── DashboardHome.js
│   │   ├── EmployeesPage.js
│   │   └── AddEmployeePage.js
│   ├── App.js
│   ├── index.js
│   └── index.css               # Tailwind directives
├── tailwind.config.js
└── package.json
```

---

## Setup & Run (IntelliJ IDEA)

### Prerequisites

- **Node.js** v16 or higher → https://nodejs.org
- **npm** (comes with Node.js)

### Step 1 — Open project in IntelliJ

1. Open IntelliJ IDEA
2. `File → Open` → Select the `employee-dashboard` folder
3. IntelliJ will detect it as a Node.js project

### Step 2 — Install dependencies

Open the **Terminal** tab (bottom of IntelliJ) and run:

```bash
npm install
```

This installs React, React Router, React Scripts, and Tailwind CSS.

### Step 3 — Run the development server

```bash
npm start
```

The app will open at **http://localhost:3000** in your browser.

### Step 4 — Build for production (optional)

```bash
npm run build
```

---

## Tailwind CSS Note

Tailwind is configured via PostCSS inside `react-scripts`. No separate build step is needed — `npm start` handles everything automatically.

---

## API Endpoints Used

| Feature          | URL                                    |
|------------------|----------------------------------------|
| Login            | `POST https://dummyjson.com/auth/login` |
| Employee listing | `GET https://dummyjson.com/users?limit=30` |

---

## Tech Stack

- React 18
- React Router v6
- Tailwind CSS 3 (via react-scripts PostCSS)
- Context API (no Redux needed)
- DummyJSON REST API
