import User from '../models/User.js';
import Order from '../models/Order.js';
import Admin from '../models/Admin.js';
import Feedback from '../models/Feedback.js';
import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { deleteImage } from '../utils/cloudinary.js';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Product Controllers
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

const createProduct = async (req, res) => {
  // Add this debug log temporarily
  console.log('Environment variables in controller:');
  console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
  
  console.log('Creating product with body:', req.body);
  console.log('Uploaded file:', req.file);
  try {
    const { name, price, category } = req.body;
    
    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Product image is required' });
    }

    const product = new Product({
      name,
      price,
      category,
      image: req.file.path, // Cloudinary URL
      cloudinaryId: req.file.filename // Cloudinary public ID
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;

    // If new image is uploaded, replace the old one
    if (req.file) {
      // Delete old image from Cloudinary
      if (product.cloudinaryId) {
        try {
          await deleteImage(product.cloudinaryId);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
      
      product.image = req.file.path; // New Cloudinary URL
      product.cloudinaryId = req.file.filename; // New Cloudinary public ID
    }

    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  console.log('Deleting product with ID:', req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete image from Cloudinary
    if (product.cloudinaryId) {
      try {
        await deleteImage(product.cloudinaryId);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// User Controllers
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json({ message: 'User status updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Order Controllers
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};

// Admin Controllers
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error: error.message });
  }
};

const updateAdminStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    ).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin status updated', admin });
  } catch (error) {
    res.status(500).json({ message: 'Error updating admin status', error: error.message });
  }
};

const updateAdminRole = async (req, res) => {
  try {
    const { role } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.params.id, 
      { role }, 
      { new: true }
    ).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin role updated', admin });
  } catch (error) {
    res.status(500).json({ message: 'Error updating admin role', error: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admin', error: error.message });
  }
};

// Feedback Controllers
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'name email')
      .populate('orderId', 'id')
      .sort({ createdAt: -1 });
    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error: error.message });
  }
};

const updateFeedbackStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback status updated', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback status', error: error.message });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    // Get counts from database
    const [
      totalUsers,
      totalOrders,
      totalProducts,
      totalAdmins,
      totalFeedbacks,
      pendingOrders,
      completedOrders,
      unreadFeedbacks
    ] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Product.countDocuments(),
      Admin.countDocuments(),
      Feedback.countDocuments(),
      Order.countDocuments({ $or: [{ status: 'pending' }, { orderStatus: 'Pending' }] }),
      Order.countDocuments({ $or: [{ status: 'delivered' }, { orderStatus: 'Delivered' }] }),
      Feedback.countDocuments({ status: 'unread' })
    ]);

    const stats = {
      users: totalUsers,
      orders: totalOrders,
      products: totalProducts,
      admins: totalAdmins,
      feedbacks: totalFeedbacks,
      pendingOrders,
      completedOrders,
      unreadFeedbacks
    };

    res.status(200).json({ stats });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getAllAdmins,
  updateAdminStatus,
  updateAdminRole,
  deleteAdmin,
  getAllFeedbacks,
  updateFeedbackStatus,
  deleteFeedback,
  getDashboardStats,
};
