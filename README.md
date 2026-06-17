# ShopEZ E-Commerce Application

A full-stack MERN e-commerce platform with user-facing storefront and an admin dashboard.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite) + Vanilla CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT Tokens |

## 📁 Project Structure

```
SHOPEZ E-commerce Application/
├── client/          # React Frontend (Vite)
├── server.js        # Express Backend entry
├── config/          # DB connection
├── controllers/     # Route handlers
├── middleware/      # Auth + Admin guards
├── models/          # Mongoose schemas
├── routes/          # Express routers
├── uploads/         # Uploaded product images
├── seed.js          # Database seeder
└── .env             # Environment config
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (running locally on port 27017)

### 1. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash more 
cd client
npm install
```

### 2. Configure Environment

Edit `.env` in the root:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopez
JWT_SECRET=shopez_super_secret_jwt_key_2024
NODE_ENV=development
```

### 3. Seed the Database

```bash
node seed.js
```

This creates:
- 🛡️ Admin: `admin@shopez.com` / `admin123`
- 👤 User: `john@example.com` / `user123`
- 📦 12 sample products

### 4. Start the Backend

```bash
node server.js
```
Server runs at: `http://localhost:5000`

### 5. Start the Frontend

```bash
cd client
npm run dev
```
Frontend runs at: `http://localhost:5173`

## 🔐 Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@shopez.com | admin123 |
| User | john@example.com | user123 |

## 📱 Features

### Customer Features
- ✅ User registration & login
- ✅ Browse product catalog (search, filter by category, sort, paginate)
- ✅ Product detail pages with image gallery & reviews
- ✅ Shopping cart (add, update, remove, clear)
- ✅ 3-step checkout (address → payment → confirm)
- ✅ Order confirmation with status tracker
- ✅ Order history in profile
- ✅ Editable profile & address

### Admin Features
- ✅ Secure admin portal
- ✅ Dashboard with stats & analytics charts
- ✅ Product management (CRUD + image upload)
- ✅ Order management (update status/payment)
- ✅ User management (activate/deactivate)

## 🌐 API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product |
| POST | /api/products/:id/reviews | Add review |
| GET | /api/cart | Get user cart |
| POST | /api/cart | Add to cart |
| POST | /api/orders | Place order |
| GET | /api/orders | Get my orders |
| GET | /api/admin/stats | Admin stats |
| GET | /api/admin/products | Admin products |
| GET | /api/admin/orders | Admin orders |
| GET | /api/admin/users | Admin users |
