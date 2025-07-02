import Order from "../models/Order.js";

const OrderController = {
    async createOrder(req, res) {
        console.log("Creating order with data:", req.body); // Log the request body for debugging
        try {
            const { user, products, totalPrice, paymentMethod, shippingAddress } = req.body;

            if (!user || !user._id) {
                return res.status(400).json({ message: "User ID is required" });
            }

            const newOrder = new Order({
                userId: user._id, // Access user._id from req.body
                products,
                totalPrice,
                paymentMethod,
                shippingAddress,
            });

            await newOrder.save();
            res.status(201).json({ message: "Order created successfully", order: newOrder });
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({ message: "Error creating order", error: error.message });
        }
    },
    
    async getOrders(req, res) {
        try {
        const orders = await Order.find({});
        res.status(200).json(orders);
        } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
        }
    },

    async getOrderById(req, res) {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: "Error fetching order", error: error.message });
        }
    },

    async getOrdersByUserId(req, res) {
        try {
            const userId = req.params.id;
            const orders = await Order.find({ userId: userId })
                .populate('userId', 'name email phone')
                .sort({ createdAt: -1 });
            
            console.log('Found orders count:', orders.length);
            res.status(200).json(orders);
        } catch (error) {
            console.error("Error fetching orders by user ID:", error);
            res.status(500).json({ message: "Error fetching orders", error: error.message });
        }
    }
};

export default OrderController;