import Order from "../models/Order.js";

const OrderController = {
    async createOrder(req, res) {
        console.log("Creating order with data:", req.body); // Log the request body for debugging
        try {
            const { user, products, totalPrice, paymentMethod, shippingAddress } = req.body;

            if (!user || !user._id) {
                return res.status(400).json({ message: "User ID is required" });
            }

            if (!products || products.length === 0) {
                return res.status(400).json({ message: "Products are required" });
            }

            // Log products for debugging
            console.log("Products array:", products);

            // Validate and format products
            const formattedProducts = products.map((product, index) => {
                const productId = product.productId || product.id || product._id;
                if (!productId) {
                    console.error(`Product at index ${index} is missing productId:`, product);
                    throw new Error(`Product at index ${index} is missing productId`);
                }
                return {
                    productId: productId,
                    quantity: product.quantity || 1
                };
            });

            console.log("Formatted products:", formattedProducts);

            // Build delivery address string from shipping address
            const deliveryAddress = `${shippingAddress.flat || ''} ${shippingAddress.building || ''}, ${shippingAddress.area || ''}, ${shippingAddress.town || ''}, ${shippingAddress.city}, ${shippingAddress.state || ''}, ${shippingAddress.country} - ${shippingAddress.pincode}`.trim();

            const newOrder = new Order({
                userId: user._id,
                products: formattedProducts,
                totalPrice,
                paymentMethod,
                shippingAddress,
                customerName: user.name,
                customerEmail: user.email,
                customerPhone: user.phone || 'Not provided',
                deliveryAddress: deliveryAddress
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