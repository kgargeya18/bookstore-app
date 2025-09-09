# Bookstore App

## Overview
A full-stack Bookstore application with a Node.js/Express backend and a React frontend. Features include authentication, book browsing, cart, and order management.

## Prerequisites
- Node.js (v16+ recommended)
- npm

## Setup Instructions

### 1. Clone the Repository
```
git clone <your-repo-url>
cd bookstore-app
```

### 2. Backend Setup
```
cd backend
npm install
```
- Configure your `.env` file in `backend/` with:
  - `MONGO_URL` (your MongoDB connection string)
  - `JWT_SECRET` (any secret string)
  - `PORT` (default: 5000)

#### Start Backend
```
npm run dev
```

### 3. Frontend Setup
```
cd ../frontend
npm install
```

#### Start Frontend
```
npm start
```

### 4. Access the App
- Backend runs on [http://localhost:5000](http://localhost:5000)
- Frontend runs on [http://localhost:3000](http://localhost:3000)

## Features
- User registration & login
- Browse books
- Add to cart & checkout
- View orders
- Protected routes

## Advanced 3D UI
To apply a modern 3D UI, use libraries like [three.js](https://threejs.org/) or [react-three-fiber](https://docs.pmnd.rs/react-three-fiber). Example integration:

1. Install react-three-fiber:
   ```
   npm install @react-three/fiber three
   ```
2. Use in a component (e.g., `BookCard.js`):
   ```jsx
   import { Canvas } from '@react-three/fiber';
   import { Box } from '@react-three/drei';

   function Book3D() {
     return (
       <Canvas style={{ height: 200 }}>
         <ambientLight />
         <Box args={[1, 1.5, 0.2]} position={[0, 0, 0]}>
           <meshStandardMaterial attach="material" color="orange" />
         </Box>
       </Canvas>
     );
   }
   export default Book3D;
   ```
3. Replace your book cover or card with `<Book3D />` for a 3D effect.

For a fully immersive UI, design 3D scenes for book shelves, cart, and orders using react-three-fiber and drei components.

---

## Troubleshooting
- Ensure MongoDB is running and accessible.
- Check `.env` variables for typos.
- Use browser dev tools and backend logs for debugging.

## License
MIT
# 📚 Bookstore App (MERN Stack)

A full-stack **Bookstore Application** built with **MongoDB, Express.js, React, and Node.js (MERN)**.  
It allows users to browse books, add to cart, place orders, and manage authentication.

---

## 🚀 Features
- 🔐 User Authentication (Register/Login with JWT)
- 📖 Browse & Search Books
- 🛒 Shopping Cart + Orders
- 👨‍💻 Admin Features (Add/Remove Books)
- 🎨 Clean UI with **React + TailwindCSS**

---

## 🛠️ Tech Stack
- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens)

---

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/kgargeya18/bookstore-app.git
cd bookstore-app

