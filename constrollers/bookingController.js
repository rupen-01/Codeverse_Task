const Booking = require('../model/bookingModel');
const Event = require('../model/eventsModel');
const { generateBookingId } = require('../utils/idGenretor');

exports.createBooking = async (req, res) => {
    const session = await Event.startSession();
    session.startTransaction();
    try {
        const { eventId, qty } = req.body;
        const event = await Event.findById(eventId).session(session);
        if(!event || event.availableSeats < qty){
            await session.abortTransaction();
            return res.status(400).json({ message: 'Not enough seats' });
        }
        event.availableSeats -= qty;
        await event.save();

        const booking = await Booking.create([{
            customId: generateBookingId(),
            event: event._id,
            customer: req.user._id,
            qty,
            totalPrice: qty * event.price
        }], { session });

        await session.commitTransaction();
        req.app.get('io').emit('new-booking', { eventId: event._id, qty });
        res.json(booking[0]);
    } catch(err) {
        await session.abortTransaction();
        res.status(400).json({ error: err.message });
    } finally {
        session.endSession();
    }
}
