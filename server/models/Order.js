import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
        productId: {
            type: Number,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        },
    ],    
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'],
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    shippingAddress: {
        flat : {
            type: String,
        },
        building : {
            type: String,
        },
        area : {
            type: String,
        },
        town : {
            type: String,
        },
        city : {
            type: String,
            required: true,
        },
        state : {
            type: String,
        },
        country : {
            type: String,
            required: true,
        },
        pincode : {
            type: String,
            required: true,
        },
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;