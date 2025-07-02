import express from 'express';
import Product from '../models/Product.js';

const productRouter = express.Router();

// Get all products (public endpoint)
productRouter.get('/products', async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Get products by category (public endpoint)
productRouter.get('/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ 
      category: category.toLowerCase(), 
      isAvailable: true 
    });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error: error.message });
  }
});

// Get single product by ID (public endpoint)
productRouter.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

export default productRouter;
