const express = require("express");
const BookingModel = require("../models/booking_schema");
const bookingRoute = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = "passwordKey";

bookingRoute.post("/book-place", async (req, res) => {
  try {
    const { token } = req.cookies;

    const {
      placeId,
      checkIn,
      checkOut,
      numberOfGuests,
      price,
      name,
      email,
      mobile,
    } = req.body;

    let uid;
    jwt.verify(token, secretKey, {}, (err, userData) => {
      if (err) throw err;
      uid = userData.id;
    });

    let booking = new BookingModel({
      placeId,
      bookedByUser: uid,
      checkIn,
      checkOut,
      guests: numberOfGuests,
      name,
      email,
      mobile,
      price,
    });

    booking = await booking.save();
    res.json(booking);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

bookingRoute.get("/get-bookings", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secretKey, {}, async (err, userData) => {
    if (err) throw err;
    const urBookings = await BookingModel.find({
      bookedByUser: userData.id,
    }).populate({ path: "placeId", strictPopulate: false });
    res.json(urBookings);
  });
});

module.exports = bookingRoute;
