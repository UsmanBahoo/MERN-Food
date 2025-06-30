import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    feedback: { type: String, required: true },
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;