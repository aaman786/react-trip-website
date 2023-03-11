const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth_routes");
const userRouter = require("./routes/user_routes");
const localRoute = require("./routes/local_routes");
const bookingRoute = require("./routes/booking_route");

// init
const PORT = 4000;
const app = express();
const DB =
  "mongodb+srv://aaman786:satvilkar@cluster0.rjwe8tj.mongodb.net/?retryWrites=true&w=majority";

// routes
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(authRouter);
app.use(userRouter);
app.use(localRoute);
app.use(bookingRoute);

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection to the Mongooose successfull :) 🎃🎃🎃");
  })
  .catch((e) => console.log(`The error has been occured to Mongoose ${e}`));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
