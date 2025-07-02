# MERN Food Application - Database Setup Instructions

## Setting up the Database with Sample Data

To see the latest dishes on the home page and menu items, you need to populate the database with sample products.

## Prerequisites
1. Make sure MongoDB is installed and running on your system
2. Create a `.env` file in the server directory with your MongoDB connection string

## Environment Setup

Create a `.env` file in the `server` directory with the following content:

```env
MONGO_URI=mongodb://localhost:27017/mernfood
PORT=5000
JWT_SECRET=your_jwt_secret_here
```

Replace `your_jwt_secret_here` with a secure JWT secret.

## Seeding the Database

To populate the database with initial products, run:

```bash
cd server
npm run seed
```

This will:
1. Connect to the MongoDB database
2. Clear any existing products
3. Insert sample products for each category (burgers, pizzas, desserts, drinks)

## Running the Application

1. Start the server:
```bash
cd server
npm start
```

2. Start the client (in a new terminal):
```bash
cd client
npm run dev
```

The Menu page will now fetch and display products from the database instead of using mock data.

## Adding New Products

You can add new products through the admin panel or by using the API endpoints:
- `POST /api/products` (admin only)
- `GET /api/products` (public)
- `GET /api/products/category/:category` (public)
- `GET /api/products/:id` (public)
