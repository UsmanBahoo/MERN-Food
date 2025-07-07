import express from 'express';
import { upload } from '../utils/cloudinary.js';

const adminRouter = express.Router();

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