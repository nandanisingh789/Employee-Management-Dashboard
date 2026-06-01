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
