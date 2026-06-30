# BusyBuy

An E-Commerce web application built with React and Firebase.

## Demo Login
- **Email:** codingninjas@codingninjas.com
- **Password:** codingninjas

## Features
- User Authentication (Signup / Signin) via Firebase
- Product browsing, searching, and filtering (by price & category)
- Cart management (add, remove, change quantities)
- Order history with complete summaries
- Real-time notifications via React Toastify

## To run locally:
```bash
npm install && npm start
```
*Note: Make sure you use Node.js 18+ for compatibility.*

## Project Structure
- `src/config/firebase.js`: Firebase configuration containing fallback demo keys.
- `src/context`: React Context Providers for global state management (Auth, Products, Cart, Orders).
- `src/components`: Reusable UI components.
- `src/pages`: Distinct application views routed by React Router.
