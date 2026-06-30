# 🛍️ BusyBuy

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

> **Live Application:** [BusyBuy Demo](http://steady-ganache-c917c7.netlify.app) *(Password: My-Drop-Site)*

A high-performance, robust E-Commerce web application engineered with React and Firebase. This project emphasizes clean architecture, modular component design, and seamless state management.

## ✨ Features
* **Authentication:** Secure Signup & Signin flows backed by Firebase Auth.
* **Product Discovery:** Real-time search and complex filtering (price range & categories).
* **Cart Management:** Persistent user cart interactions integrated seamlessly via React Context API.
* **Order History:** Complete archival and display of past purchases.
* **Responsive UI:** Fluid layouts with immediate user feedback (via React Toastify & Spinners).

## 🚀 Quick Start

### Prerequisites
* Node.js (v18.x recommended)
* NPM or Yarn

### Installation
Clone the repository and install dependencies:
```bash
git clone <your-repo-url>
cd scaffold
npm install
```

### Execution
Run the local development server:
```bash
npm start
```

## 🏗️ Architecture & State Management
This application utilizes a decentralized Context API approach to avoid prop-drilling while keeping the bundle size optimal.
* `AuthContext`: Manages user sessions and Firebase identity.
* `ProductContext`: Handles data fetching, client-side caching, and complex filtering algorithms.
* `CartContext` & `OrderContext`: Manages transactional state and purchase history.

## Demo Login
- **Email:** codingninjas@codingninjas.com
- **Password:** codingninjas

## Live Demo
- **Netlify Link:** http://fascinating-dodol-0861f4.netlify.app
- **Site Password (if requested):** My-Drop-Site

## Features
*Note: Make sure you use Node.js 18+ for compatibility.*

## Project Structure
- `src/config/firebase.js`: Firebase configuration containing fallback demo keys.
- `src/context`: React Context Providers for global state management (Auth, Products, Cart, Orders).
- `src/components`: Reusable UI components.
- `src/pages`: Distinct application views routed by React Router.
