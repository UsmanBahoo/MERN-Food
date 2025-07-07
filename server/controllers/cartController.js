import User from '../models/User.js';
import Product from '../models/Product.js';

// Get user's cart
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cart.productId');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
};

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity = 1 } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if item already exists in cart
        const existingItemIndex = user.cart.findIndex(
            item => item.productId.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Update quantity if item exists
            user.cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            user.cart.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity
            });
        }

        await user.save();
        res.status(200).json({ message: 'Item added to cart', cart: user.cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const { quantity } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItem = user.cart.id(itemId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        if (quantity <= 0) {
            user.cart.pull(itemId);
        } else {
            cartItem.quantity = quantity;
        }

        await user.save();
        res.status(200).json({ message: 'Cart updated', cart: user.cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    console.error('Removing item from cart', req.params);
    try {
        const { userId, itemId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart.pull(itemId);
        await user.save();

        res.status(200).json({ message: 'Item removed from cart', cart: user.cart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Error removing from cart', error: error.message });
    }
};

// Clear entire cart
const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart = [];
        await user.save();

        res.status(200).json({ message: 'Cart cleared', cart: user.cart });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
};

// Sync local cart with database cart
const syncCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { localCart } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Merge local cart with database cart
        for (const localItem of localCart) {
            const existingItemIndex = user.cart.findIndex(
                item => item.productId.toString() === localItem.productId || 
                       item.productId.toString() === localItem.id
            );

            if (existingItemIndex > -1) {
                // Update quantity if item exists
                user.cart[existingItemIndex].quantity += localItem.quantity;
            } else {
                // Add new item to cart
                const product = await Product.findById(localItem.productId || localItem.id);
                if (product) {
                    user.cart.push({
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                        quantity: localItem.quantity
                    });
                }
            }
        }

        await user.save();
        res.status(200).json({ message: 'Cart synced', cart: user.cart });
    } catch (error) {
        console.error('Error syncing cart:', error);
        res.status(500).json({ message: 'Error syncing cart', error: error.message });
    }
};

export {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    syncCart
};
