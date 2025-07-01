import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if admin is active
        if (admin.status !== 'active') {
            return res.status(401).json({ message: 'Admin account is deactivated' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        // Generate JWT token (optional)
        const token = jwt.sign(
            { 
                adminId: admin._id, 
                email: admin.email, 
                role: admin.role 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Remove password from response
        const adminResponse = {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            role: admin.role,
            status: admin.status,
            lastLogin: admin.lastLogin
        };

        res.status(200).json({
            message: 'Admin login successful',
            admin: adminResponse,
            token
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const adminRegister = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Admin with this email already exists' });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            phone: phone || '',
            role: role || 'staff',
            status: 'active'
        });

        await newAdmin.save();

        // Remove password from response
        const adminResponse = {
            _id: newAdmin._id,
            name: newAdmin.name,
            email: newAdmin.email,
            phone: newAdmin.phone,
            role: newAdmin.role,
            status: newAdmin.status
        };

        res.status(201).json({
            message: 'Admin registered successfully',
            admin: adminResponse
        });

    } catch (error) {
        console.error('Admin registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateAdminProfile = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { name, email, currentPassword, newPassword } = req.body;

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Update profile fields
        if (name) admin.name = name;
        if (email) admin.email = email;

        // Update password if provided
        if (newPassword) {
            const saltRounds = 10;
            admin.password = await bcrypt.hash(newPassword, saltRounds);
        }

        await admin.save();

        // Remove password from response
        const adminResponse = {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            role: admin.role,
            status: admin.status
        };

        res.status(200).json({
            message: 'Admin profile updated successfully',
            admin: adminResponse
        });

    } catch (error) {
        console.error('Admin profile update error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    adminLogin,
    adminRegister,
    updateAdminProfile
};
