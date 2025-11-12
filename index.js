const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/userRoute');
const eventRoutes = require('./routes/eventRoute');
const bookingRoutes = require('./routes/bookingsRoutes');
const { authMiddleware } = require('./middleware/auth');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());

io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);
});
app.set('io', io);

// Routes
app.use('/api', authRoutes);
app.use('/api/events', authMiddleware, eventRoutes);
app.use('/api/bookings', authMiddleware, bookingRoutes);

mongoose.connect('mongodb://localhost:27017/Event_Booking')
    .then(() => server.listen(3000, () => console.log('Server running on 3000')))
    .catch(err => console.log(err));
