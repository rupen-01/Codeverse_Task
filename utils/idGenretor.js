let evtCounter = 1000;
let bkCounter = 1000;

function generateEventId() {
    evtCounter++;
    return `EVT-${evtCounter}`;
}

function generateBookingId() {
    bkCounter++;
    return `BK-${bkCounter}`;
}

module.exports = { generateEventId, generateBookingId };
