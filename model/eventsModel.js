const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    customId: String,
    title: String,
    description: String,
    date: Date,
    city: String,
    tags: [String],
    totalSeats: Number,
    availableSeats: Number,
    price: Number,
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "CANCELLED"],
      default: "DRAFT",
    },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
