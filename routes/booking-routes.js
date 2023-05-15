const express = require('express');
const { Booking, deleteBooking } = require('../controllers/booking-controller.js');
const bookingRouter = express.Router();
 
bookingRouter.post('/',Booking);
bookingRouter.delete('/:id',deleteBooking);
module.exports = bookingRouter;