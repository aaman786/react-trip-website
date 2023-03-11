import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, redirect } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../../userContext";

const BookingPlaceWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, SetNumOfGuests] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [redirect, setRedirect] = useState(null);
  const { user } = useContext(UserContext);

  let numberOfDays = 0;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookPlace() {
    const bookingData = {
      placeId: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      price: numberOfDays * place.price,
      name,
      email,
      mobile,
    };

    const bookingResponse = await axios.post("/book-place", bookingData);
    const bookingId = bookingResponse.data._id;
    setRedirect(`/account/booking/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div>
            <label className="py-3 px-4"> Check-in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <label className="py-3 px-4 border-l"> Check-out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of Guests: </label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => SetNumOfGuests(ev.target.value)}
          />
        </div>
        {numberOfDays > 0 && (
          <div>
            <label className="py-3 px-4 border-l">Your full name</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label className="py-3 px-4 border-l">Your email</label>
            <input
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <label className="py-3 px-4 border-l">Your phone number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(ev) => setMobile(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookPlace} className="primary mt-4">
        Book this place{" "}
        {numberOfDays > 0 && <span>${numberOfDays * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingPlaceWidget;
