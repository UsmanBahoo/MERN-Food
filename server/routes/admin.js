import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminRouter = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    const productsDir = path.join(uploadsDir, 'products');
    
    // Create directories if they don't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    if (!fs.existsSync(productsDir)) {
      fs.mkdirSync(productsDir, { recursive: true });
    }
    
    cb(null, productsDir); // Use absolute path
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Controllers
import {
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
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboardStats,
} from '../controllers/adminController.js';

// Dashboard stats route
adminRouter.get('/dashboard/stats', getDashboardStats);

// Products management routes
adminRouter.get('/products', getAllProducts);
adminRouter.post('/products', upload.single('image'), createProduct);
adminRouter.put('/products/:id', upload.single('image'), updateProduct);
adminRouter.delete('/products/:id', deleteProduct);

// Users management routes
adminRouter.get('/users', getAllUsers);
adminRouter.patch('/users/:id/status', updateUserStatus);
adminRouter.delete('/users/:id', deleteUser);

// Orders management routes
adminRouter.get('/orders', getAllOrders);
adminRouter.patch('/orders/:id/status', updateOrderStatus);
adminRouter.delete('/orders/:id', deleteOrder);

// Admins management routes
adminRouter.get('/admins', getAllAdmins);
adminRouter.patch('/admins/:id/status', updateAdminStatus);
adminRouter.patch('/admins/:id/role', updateAdminRole);
adminRouter.delete('/admins/:id', deleteAdmin);

// Feedbacks management routes
adminRouter.get('/feedbacks', getAllFeedbacks);
adminRouter.patch('/feedbacks/:id/status', updateFeedbackStatus);
adminRouter.delete('/feedbacks/:id', deleteFeedback);

export default adminRouter;