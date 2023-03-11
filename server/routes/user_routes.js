const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();
const imageDownloader = require("image-downloader");
const fs = require("fs");
const PlaceModel = require("../models/place_schema");

const secretKey = "passwordKey";

userRouter.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest:
      "C:\\Users\\Aaman_Satvilkar\\Desktop\\React Projects\\trip-website\\react-trip-website\\server\\uploads\\" +
      newName,
  });

  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
userRouter.post(
  "/upload",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads\\", ""));
    }
    res.json(uploadedFiles);
  }
);

userRouter.post("/add-places", (req, res) => {
  try {
    const { token } = req.cookies;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    console.log(perks);

    jwt.verify(token, secretKey, {}, async (err, userData) => {
      if (err) throw err;
      let place = new PlaceModel({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      console.log(place);

      place = await place.save();

      res.json(place);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

userRouter.get("/user-places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secretKey, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;

    const myAddedPlace = await PlaceModel.find({ owner: id });

    res.json(myAddedPlace);
  });
});



userRouter.put("/update-place-data", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, secretKey, {}, async (err, userData) => {
    if (err) throw err;
    const place = await PlaceModel.findById(id);
    if (userData.id === place.owner.toString()) {
      const newPlaceData = {
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      };
      place.set(newPlaceData);
      await place.save();
      res.json(newPlaceData);
    }
  });
});

module.exports = userRouter;
