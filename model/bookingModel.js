const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customId: String,
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    qty: Number,
    totalPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
