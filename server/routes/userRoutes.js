import express from 'express';
import User from '../models/User.js';
import UserController from '../controllers/UserController.js';

const userRouter = express.Router();

// Get single user
userRouter.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

userRouter.put('/user/:id', UserController.updateUser);
userRouter.delete('/user/:id', UserController.deleteUser);
userRouter.put('/users/:id/location', UserController.updateLocation);
export default userRouter;
