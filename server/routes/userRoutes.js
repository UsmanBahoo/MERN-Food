import express from 'express';
import UserController from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/user/:id', UserController.getUser); 
userRouter.put('/user/:id', UserController.updateUser);
userRouter.delete('/user/:id', UserController.deleteUser);

export default userRouter;

