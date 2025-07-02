import express from 'express';
import OrderController from '../controllers/OrderController.js';

const orderRouter = express.Router();

console.log('Order routes being registered...');

orderRouter.post('/order', OrderController.createOrder);
orderRouter.get('/orders', OrderController.getOrders);
orderRouter.get('/orders/user/:id', OrderController.getOrdersByUserId);
orderRouter.get('/order/:id', OrderController.getOrderById);

console.log('Order routes registered');

export default orderRouter;