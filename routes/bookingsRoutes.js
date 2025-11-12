const express = require('express');
const router = express.Router();
const { createBooking } = require('../constrollers/bookingController');


router.post('/', createBooking);

module.exports = router;
