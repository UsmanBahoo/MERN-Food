import express from 'express';
import { adminLogin, adminRegister, updateAdminProfile } from '../controllers/adminAuthController.js';

const router = express.Router();

// Admin authentication routes
router.post('/login', adminLogin);
router.post('/register', adminRegister);
router.put('/profile/:adminId', updateAdminProfile);

export default router;
