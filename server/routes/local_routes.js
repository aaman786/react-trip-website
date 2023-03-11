const express = require("express");
const PlaceModel = require("../models/place_schema");
const localRoute = express.Router();

localRoute.get("/api/places", async (req, res) => {
  const allPlaces = await PlaceModel.find();
  res.json(allPlaces);
});

localRoute.get("/places/:id", async (req, res) => {
  const { id } = req.params;

  const placeById = await PlaceModel.findById(id);

  res.json(placeById);
});

module.exports = localRoute;
