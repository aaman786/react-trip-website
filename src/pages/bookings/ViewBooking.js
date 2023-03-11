import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../../components/AddressLink";
import BookingDates from "../../components/BookingDates";
import PlaceImgGallery from "../../components/PlaceImgGallery";

const ViewBooking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/get-bookings").then((bookingResponse) => {
        const foundBooking = bookingResponse.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
          console.log(foundBooking.placeId.address);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "Booking not available!";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.placeId.title}</h1>
      <AddressLink className="my-2 block">
        {booking.placeId.address}
      </AddressLink>
      <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
        <h2 className="text-xl">Your booking information:</h2>
        <BookingDates booking={booking} />
      </div>
      <PlaceImgGallery place={booking.placeId} />
    </div>
  );
};

export default ViewBooking;
