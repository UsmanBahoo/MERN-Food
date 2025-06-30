import express from 'express';
import OrderController from '../controllers/OrderController.js';

const orderRouter = express.Router();


orderRouter.post('/order/', OrderController.createOrder);
orderRouter.get('/order/', OrderController.getOrders);
orderRouter.get('/order/:id', OrderController.getOrderById);

export default orderRouter;