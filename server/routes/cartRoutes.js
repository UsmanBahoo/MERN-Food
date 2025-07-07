import express from 'express';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    syncCart
} from '../controllers/cartController.js';

const cartRouter = express.Router();

// Cart routes
cartRouter.get('/cart/:userId', getCart);
cartRouter.post('/cart/:userId/add', addToCart);
cartRouter.put('/cart/:userId/item/:itemId', updateCartItem);
cartRouter.delete('/cart/:userId/item/:itemId', removeFromCart);
cartRouter.delete('/cart/:userId/clear', clearCart);
cartRouter.post('/cart/:userId/sync', syncCart);

export default cartRouter;
