import User from '../models/User.js';

const UserController = {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    },
    async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                console.log('User not found with ID:', userId);
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    },
    async updateUser(req, res) {
        console.log('Id: ', req.params.id);
        console.log('Body: ', req.body);
        try {
            const userId = req.params.id;
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    },
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    },

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email, password });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            res.status(200).json({ message: 'Login successful', user });
        }
        catch (error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    },

    async updateAddress(req, res) {
        try {
            const userId = req.params.id;
            const { address } = req.body;
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { address },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Address updated successfully', user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error updating address', error: error.message });
        }
    },

    async updateLocation(req, res) {
        console.log('Id: ', req.params.id);
        console.log('Body: ', req.body);
        try {
            const userId = req.params.id;
            const { location } = req.body;
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { location },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Location updated successfully', user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'File: UserController 101: Error updating location', error: error.message });
        }
    },

};

export default UserController;