import express from 'express';
import FeedbackController from '../controllers/FeedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.post('/feedback', FeedbackController.createFeedback)
feedbackRouter.get('/feedback/:id', FeedbackController.getFeedback); 
feedbackRouter.get('/feedbacks', FeedbackController.getAllFeedbacks);
feedbackRouter.delete('/feedback/:id', FeedbackController.deleteFeedback);

export default feedbackRouter;