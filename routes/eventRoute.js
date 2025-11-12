const express = require('express');
const router = express.Router();
const { createEvent, publishEvent, cancelEvent, myEvents, listPublished } = require('../constrollers/eventController');
const { roleMiddleware } = require('../middleware/auth');

router.post('/', roleMiddleware('ORGANIZER'), createEvent);
router.post('/:id/publish', roleMiddleware('ORGANIZER'), publishEvent);
router.post('/:id/cancel', roleMiddleware('ORGANIZER'), cancelEvent);
router.get('/me', roleMiddleware('ORGANIZER'), myEvents);
router.get('/', listPublished);

module.exports = router;
