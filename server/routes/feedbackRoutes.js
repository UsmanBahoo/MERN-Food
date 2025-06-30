import express from 'express';
import FeedbackController from '../controllers/FeedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.post('/feedback', FeedbackController.createFeedback)
feedbackRouter.get('/feedback/:id', FeedbackController.getFeedback); 

export default feedbackRouter;