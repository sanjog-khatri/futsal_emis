const express = require('express');
const router = express.Router();
const { createBooking, getBookingsForPlayer, updateBooking, cancelBooking, getChallengesforBooking, acceptBooking, rejectBooking } = require('../Controllers/BookingController');
const authorizeRoles = require('../Middlewares/AuthRole');

router.post('/', authorizeRoles, createBooking);
router.get('/player', getBookingsForPlayer);
router.put('/:id', updateBooking);
router.delete('/:id',cancelBooking);
router.get('/challenge/:bookingId', getChallengesforBooking);

router.post('/accept/:bookingId', acceptBooking);
router.post('/reject/:bookingId', rejectBooking);

module.exports = router;