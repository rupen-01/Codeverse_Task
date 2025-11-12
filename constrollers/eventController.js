const Event = require('../model/eventsModel');
const { generateEventId } = require('../utils/idGenretor');

exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create({
            ...req.body,
            customId: generateEventId(),
            organizer: req.user._id,
            availableSeats: req.body.totalSeats
        });
        res.json(event);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

exports.publishEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id, organizer: req.user._id });
        if(!event) return res.status(404).json({ message: 'Event not found' });
        event.status = 'PUBLISHED';
        await event.save();
        res.json(event);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

exports.cancelEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id, organizer: req.user._id });
        if(!event) return res.status(404).json({ message: 'Event not found' });
        event.status = 'CANCELLED';
        await event.save();
        res.json(event);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

exports.myEvents = async (req, res) => {
    const events = await Event.find({ organizer: req.user._id });
    res.json(events);
}

exports.listPublished = async (req, res) => {
    const events = await Event.find({ status: 'PUBLISHED' });
    res.json(events);
}
