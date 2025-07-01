import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();

const createDefaultAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-food');
        console.log('Connected to MongoDB');

        // Check if default admin already exists
        const existingAdmin = await Admin.findOne({ email: 'admin@foodapp.com' });
        
        if (existingAdmin) {
            console.log('Default admin already exists');
            return;
        }

        // Hash the default password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash('admin123', saltRounds);

        // Create default admin
        const defaultAdmin = new Admin({
            name: 'Default Admin',
            email: 'admin@foodapp.com',
            password: hashedPassword,
            phone: '+1-234-567-8900',
            role: 'super_admin',
            status: 'active'
        });

        await defaultAdmin.save();
        console.log('Default admin created successfully!');
        console.log('Email: admin@foodapp.com');
        console.log('Password: admin123');
        console.log('Role: super_admin');

    } catch (error) {
        console.error('Error creating default admin:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
};

// Execute the function
createDefaultAdmin();

// Don't export anything since this is a standalone script
// export default createDefaultAdmin;
