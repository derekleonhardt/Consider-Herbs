const express = require('express'); 
const paymentRouter = express.Router();
const payment = require('../controllers/paymentController.js');
const db = require('../controllers/dbController.js')

paymentRouter.post('/charge', payment.postCharge, db.paidBooking);
module.exports = paymentRouter;