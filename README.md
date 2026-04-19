# BlooFi - E-Commerce Platform

**BlooFi** is a full-stack e-commerce platform specializing in balloon and floral decor. Registered users can browse, search, and order products with a fast-loading, responsive UI. Built with a focus on clean user experience, secure authentication, and reliable payment processing.

![Live](https://img.shields.io/badge/Frontend-Live-brightgreen?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## Live Demo

- Storefront: [https://bloofi.vercel.app](https://bloofi.vercel.app)

---

## Screenshots

### Home Page
<!-- Add screenshot: ./screenshots/home.png -->

### Cart Page
<!-- Add screenshot: ./screenshots/cart.png -->

---

## Features

### Storefront (Registered Users)
- Browse balloons, floral arrangements, and decor items with category-based filtering
- Advanced search querying across product names and descriptions
- Add to cart and manage cart items persistently
- Secure checkout flow with Paystack payment integration
- Digital receipts generated after successful orders
- OAuth social login and JWT-based session management
- Responsive design for mobile, tablet, and desktop

### Admin Dashboard
- Manage products (create, update, delete)
- View and manage all orders and their statuses
- Manage registered users
- Full operational oversight from a dedicated admin panel

### Security
- JWT-based authentication with secure session handling
- OAuth2 social login integration
- Protected routes for both user and admin panels
- Input validation and sanitization on all API endpoints

---

## Tech Stack

**Frontend:**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

**Backend:**

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

**Data & Infra:**

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

**Auth & Payments:**

![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![OAuth](https://img.shields.io/badge/OAuth2-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Paystack](https://img.shields.io/badge/Paystack-00C3F7?style=for-the-badge&logo=paystack&logoColor=white)

---

## Project Structure

```
BlooFi/
|-- frontend/                  # React + Vite frontend
|   |-- src/
|   |   |-- pages/           # Home, Product, Cart, Checkout, Admin views
|   |   |-- components/      # Reusable UI components
|   |   |-- store/           # Redux state management (cart, auth, products)
|   |   `-- services/        # API call handlers
|
|-- backend/                  # Node.js + Express backend
|   |-- src/
|   |   |-- routes/          # API route definitions
|   |   |-- controllers/     # Business logic
|   |   |-- middleware/      # Auth, validation, error handling
|   |   |-- services/        # Paystack integration
|   |   `-- models/          # MongoDB schema definitions (Mongoose)
|
`-- .env.example             # Environment variable template
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB 6+ (or MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/j-deku/BlooFi.git
cd BlooFi
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
# Database
MONGO_URI=your_mongodb_connection_string

# Auth
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Paystack
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key

# App
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../fy && npm install
```

### 4. Run the development servers

```bash
# Start backend (from /backend)
npm run dev

# Start frontend (from /fy or /admin)
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

---

## User Roles

| Role | Access |
|------|--------|
| Guest | Browse products only |
| Registered User | Browse, search, cart, checkout, order history |
| Admin | Full product, order, and user management |

---

## Roadmap

- [ ] Full backend deployment
- [ ] API documentation (Postman/Swagger)
- [ ] Product reviews and ratings
- [ ] Order tracking system
- [ ] Wishlist feature
- [ ] Email notifications for order updates

---

## Acknowledgments

- [Paystack](https://paystack.com) for payment integration
- [MongoDB Atlas](https://www.mongodb.com/atlas) for cloud database
- [Vite](https://vitejs.dev) for ultra-fast frontend builds

---

## Author

**Jeremiah Deku**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jeremiah-deku-jdek/)
[![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/j-deku)
[![Email](https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white)](mailto:jdeku573@gmail.com)

---

## License

This project is licensed under the MIT License.
