import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['unread', 'read', 'replied'],
        default: 'unread'
    },
    adminReply: {
        message: String,
        repliedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        },
        repliedAt: Date
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;