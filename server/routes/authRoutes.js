import express from 'express';
import UserController from '../controllers/UserController.js';

const authRouter = express.Router();

authRouter.post('/auth/register', UserController.createUser);
authRouter.post('/auth/login', UserController.loginUser);

export default authRouter;
