const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Places",
    required: true,
  },
  bookedByUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const BookingModel = mongoose.model("Bookings", bookingSchema);

module.exports = BookingModel;
