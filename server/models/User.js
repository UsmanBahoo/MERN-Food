import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: String,
        price: Number,
        image: String,
        category: String,
        quantity: {
            type: Number,
            default: 1,
            min: 1
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
