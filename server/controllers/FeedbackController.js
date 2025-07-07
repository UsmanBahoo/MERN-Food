import Feedback from '../models/Feedback.js';

const FeedbackController = {
    async createFeedback(req, res) {
        console.log('Creating feedback with data:', req.body); // Log the request body for debugging
        try {
            const { name, email, phone, feedback } = req.body;
            if (!name || !email || !phone || !feedback) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const newFeedback = new Feedback({ customerName: name, customerEmail:  email, subject: feedback });
            await newFeedback.save();
            res.status(201).json({ message: 'Feedback created successfully', feedback: newFeedback });
        } catch (error) {
            console.log('Error creating feedback/FEEDBACK: ', error);
            res.status(500).json({ message: 'Error creating feedback/FEEDBACK', error: error.message });
        }
    },

    async getFeedback(req, res) {
        try {
            const feedbackId = req.params.id;
            const feedback = await Feedback.findById(feedbackId);
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback not found' });
            }
            res.status(200).json(feedback);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching feedback', error: error.message });
        }
    },
}

export default FeedbackController;