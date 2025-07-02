import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mernfood');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Sample products data
    const products = [
      // Burgers
      {
        name: "Zinger Burger",
        category: "burger",
        price: 550,
        image: "/uploads/products/burger-1.png",
        isAvailable: true
      },
      {
        name: "Krunch Burger",
        category: "burger",
        price: 350,
        image: "/uploads/products/burger-2.png",
        isAvailable: true
      },
      {
        name: "Krunch Chicken Combo",
        category: "burger",
        price: 520,
        image: "/uploads/products/burger.png",
        isAvailable: true
      },
      
      // Pizzas
      {
        name: "Veggie Pizza",
        category: "pizza",
        price: 1500,
        image: "/uploads/products/pizza-1.png",
        isAvailable: true
      },
      {
        name: "Pizza Chicken Tikka",
        category: "pizza",
        price: 2500,
        image: "/uploads/products/pizza-2.png",
        isAvailable: true
      },
      {
        name: "Creamy Chicken Delight",
        category: "pizza",
        price: 3000,
        image: "/uploads/products/pizza-3.png",
        isAvailable: true
      },
      
      // Desserts
      {
        name: "Roasted Strawberry Crumble",
        category: "desserts",
        price: 5000,
        image: "/uploads/products/dessert-1.png",
        isAvailable: true
      },
      {
        name: "Angel Food Cake",
        category: "desserts",
        price: 2000,
        image: "/uploads/products/dessert-2.png",
        isAvailable: true
      },
      {
        name: "Almond and Date Cake",
        category: "desserts",
        price: 1200,
        image: "/uploads/products/dessert-3.png",
        isAvailable: true
      },
      
      // Drinks
      {
        name: "Red Bull",
        category: "drinks",
        price: 500,
        image: "/uploads/products/drink-1.png",
        isAvailable: true
      },
      {
        name: "Coke",
        category: "drinks",
        price: 100,
        image: "/uploads/products/drink-2.png",
        isAvailable: true
      },
      {
        name: "Sprite",
        category: "drinks",
        price: 120,
        image: "/uploads/products/drink-3.png",
        isAvailable: true
      }
    ];

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products created successfully`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedProducts();
};

runSeed();
