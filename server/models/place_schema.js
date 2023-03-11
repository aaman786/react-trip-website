const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  photos: [
    {
      type: String,
    },
  ],
  description: {
    required: true,
    type: String,
  },
  perks: [
    {
      type: String,
    },
  ],
  extraInfo: {
    required: true,
    type: String,
  },
  checkIn: {
    required: true,
    type: Number,
  },
  checkOut: {
    required: true,
    type: Number,
  },
  maxGuests: {
    required: true,
    type: Number,
  },
  price: {
    required: true,
    type: Number,
  },
});

const PlaceModel = mongoose.model("Places", placeSchema);
module.exports = PlaceModel;
