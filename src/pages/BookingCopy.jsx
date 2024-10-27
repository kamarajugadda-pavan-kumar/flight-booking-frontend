import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config";
import { fetchFlightDetailsService } from "../services/searchService";
import { fetchBooking } from "../services/bookingservice";
import { showFailureToast } from "../utils/toast";
import SeatSelection from "../components/SeatSelection";

const BookingPage = () => {
  const { flightId } = useParams();
  const params = new URLSearchParams(location.search);
  const bookingId = params.get("bookingId");

  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const seats = {
    bookedSeats: null,
    availableSeats: [
      {
        seatId: 3905,
        row: 1,
        col: "A",
        seatType: "business",
      },
      {
        seatId: 3906,
        row: 1,
        col: "B",
        seatType: "business",
      },
      {
        seatId: 3907,
        row: 1,
        col: "C",
        seatType: "business",
      },
      {
        seatId: 3908,
        row: 2,
        col: "A",
        seatType: "premium-economy",
      },
      {
        seatId: 3909,
        row: 2,
        col: "B",
        seatType: "premium-economy",
      },
      {
        seatId: 3910,
        row: 2,
        col: "C",
        seatType: "premium-economy",
      },
      {
        seatId: 3911,
        row: 3,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3912,
        row: 3,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3913,
        row: 3,
        col: "C",
        seatType: "economy",
      },
      {
        seatId: 3914,
        row: 4,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3915,
        row: 4,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3916,
        row: 4,
        col: "C",
        seatType: "economy",
      },
      {
        seatId: 3917,
        row: 5,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3918,
        row: 5,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3919,
        row: 5,
        col: "C",
        seatType: "economy",
      },
      {
        seatId: 3920,
        row: 6,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3921,
        row: 6,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3922,
        row: 6,
        col: "C",
        seatType: "economy",
      },
      {
        seatId: 3923,
        row: 7,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3924,
        row: 7,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3925,
        row: 7,
        col: "C",
        seatType: "economy",
      },
      {
        seatId: 3926,
        row: 8,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3927,
        row: 8,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3928,
        row: 8,
        col: "C",
        seatType: "economy",
      },
      {
        seatId: 3929,
        row: 9,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3930,
        row: 9,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3931,
        row: 9,
        col: "C",
        seatType: "economy",
      },
      {
        seatId: 3932,
        row: 10,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3933,
        row: 10,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3934,
        row: 10,
        col: "C",
        seatType: "economy",
      },
      {
        seatId: 3935,
        row: 11,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3936,
        row: 11,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3937,
        row: 11,
        col: "C",
        seatType: "economy",
      },
      {
        seatId: 3938,
        row: 12,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3939,
        row: 12,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3940,
        row: 12,
        col: "C",
        seatType: "economy",
      },
      {
        seatId: 3941,
        row: 13,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3942,
        row: 13,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3943,
        row: 13,
        col: "C",
        seatType: "economy",
      },
      {
        seatId: 3944,
        row: 14,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3945,
        row: 14,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3946,
        row: 14,
        col: "C",
        seatType: "economy",
      },
      {
        seatId: 3947,
        row: 15,
        col: "A",
        seatType: "economy",
      },
      {
        seatId: 3948,
        row: 15,
        col: "B",
        seatType: "economy",
      },
      {
        seatId: 3949,
        row: 15,
        col: "C",
        seatType: "economy",
      },
    ],
  };

  const fetchData = async (bookingId, flightId) => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      const flightDetails = await fetchFlightDetailsService(flightId);
      const bookingDetails = await fetchBooking(bookingId, token);
      setFlight(flightDetails);
      setBooking(bookingDetails);
    } catch (error) {
      console.log(error);
      showFailureToast("Failed to load booking/flight details");
      // navigate("/search-flights");
    } finally {
      setLoading(false);
    }
  };

  // Fetch flight details based on flightId
  useEffect(() => {
    fetchData(bookingId, flightId);
  }, [location.search]);

  // Handle payment redirection
  const handlePayment = () => {
    // Redirect to payment page
    navigate("/payment?bookingId=" + bookingId);
  };

  return loading ? (
    <>loading...</>
  ) : (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
      {flight ? (
        <>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
              {flight.departureAirportId} to {flight.arrivalAirportId}
            </h3>
            <table className="table-auto w-full text-left border border-gray-300">
              <tbody>
                <tr className="border-b">
                  <th className="px-4 py-2 font-medium">Flight Number</th>
                  <td className="px-4 py-2 text-gray-600">
                    {flight.flightNumber}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-2 font-medium">Airplane</th>
                  <td className="px-4 py-2 text-gray-600">
                    {flight.airplane.name}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-2 font-medium">Departure</th>
                  <td className="px-4 py-2 text-gray-600">
                    {new Date(flight.departureTime).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-2 font-medium">Arrival</th>
                  <td className="px-4 py-2 text-gray-600">
                    {new Date(flight.arrivalTime).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
                <tr>
                  <th className="px-4 py-2 font-medium">Price per Ticket</th>
                  <td className="px-4 py-2 text-lg font-bold">
                    ₹{flight.price}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold flex">
              Number of Tickets : {booking.numOfSeats}
            </h4>

            <h4 className="text-lg font-semibold">
              Total Amount : ₹{booking.totalCost}
            </h4>
          </div>
          <button
            className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
            onClick={handlePayment}
          >
            Proceed to Payment
          </button>
        </>
      ) : (
        <p>No flight details available. Please go back and select a flight.</p>
      )}
      <SeatSelection
        availableSeats={seats.availableSeats}
        bookedSeats={seats.bookedSeats}
      />
    </div>
  );
};

export default BookingPage;
