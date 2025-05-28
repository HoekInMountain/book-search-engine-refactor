# 📚 Book Search Engine

This is a full-stack MERN (MongoDB, Express, React, Node.js) application refactored to use **GraphQL** and **Apollo Server**. It allows users to search for books via the Google Books API, save favorites, and manage them in a personal account—all with JWT authentication.

🚀 **Live App:** [https://book-search-engine-graphql.onrender.com](https://book-search-client-scna.onrender.com/)

---

## 🛠️ Features

- 🔍 **Search** for books using the Google Books API
- ❤️ **Save** favorite books to your profile
- 🔐 **Login / Sign up** with JWT authentication
- 🌐 **GraphQL** backend with Apollo Server
- 🎨 React front-end with Bootstrap styling
- ☁️ Deployed via **Render**

---

## 📁 Project Structurebook-search-engine-refactor/
├── client/ # React frontend (Vite)
│ ├── src/
│ │ ├── components/ # Navbar, LoginForm, SignupForm
│ │ ├── pages/ # SearchBooks, SavedBooks
│ │ ├── utils/ # auth.ts, mutations.ts, queries.ts, localStorage.ts
│ │ ├── App.tsx
│ │ └── main.tsx
├── server/ # Node.js + Express + GraphQL backend
│ ├── src/
│ │ ├── config/ # MongoDB connection
│ │ ├── models/ # User, Book models
│ │ ├── schemas/ # GraphQL typeDefs and resolvers
│ │ ├── routes/ # Fallback route
│ │ ├── utils/ # JWT auth middleware
│ │ └── server.ts # Entry point
│ └── tsconfig.json
├── package.json
└── README.md




---

## 🚀 Deployment on Render

This app is deployed on **Render** as:

- **Frontend**: Static Site
- **Backend**: Node Web Service




