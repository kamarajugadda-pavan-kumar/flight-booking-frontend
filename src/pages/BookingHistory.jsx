import React, { useContext } from "react";
import { fetchBookingHistory } from "../services/bookingservice";
import { UserContext } from "../context/UserContext";

const BookingHistory = () => {
  const [bookings, setBookings] = React.useState([]);
  const { user } = useContext(UserContext);

  const fetchData = async (userId, token) => {
    try {
      const response = await fetchBookingHistory(userId, token);
      console.log(response);
      setBookings(response);
    } catch (error) {
      console.error("Failed to fetch booking history:", error);
      return [];
    }
  };

  React.useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      fetchData(user.id, token);
    }
  }, [user]);
  const now = new Date();

  // Filter for upcoming and past bookings
  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.FlightDetails.departureTime) > now
  );
  const pastBookings = bookings.filter(
    (booking) => new Date(booking.FlightDetails.departureTime) <= now
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Booking History</h2>

      <h3 className="text-xl font-semibold mb-2">Upcoming Bookings</h3>
      {upcomingBookings.length > 0 ? (
        <ul className="mb-6">
          {upcomingBookings.map((booking) => (
            <li
              key={booking.bookingId}
              className="border p-4 rounded-lg shadow-sm mb-4"
            >
              <div className="font-semibold">
                Flight Number: {booking.FlightDetails.flightNumber}
              </div>
              <div>
                From: {booking.FlightDetails.departureAirportId} to{" "}
                {booking.FlightDetails.arrivalAirportId}
              </div>
              <div>
                Departure Time:{" "}
                {new Date(booking.FlightDetails.departureTime).toLocaleString()}
              </div>
              <div>
                Tickets: {booking.numOfSeats} - Total Cost: ₹{booking.totalCost}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming bookings.</p>
      )}

      <h3 className="text-xl font-semibold mb-2">Past Bookings</h3>
      {pastBookings.length > 0 ? (
        <ul>
          {pastBookings.map((booking) => (
            <li
              key={booking.bookingId}
              className="border p-4 rounded-lg shadow-sm mb-4"
            >
              <div className="font-semibold">
                Flight Number: {booking.FlightDetails.flightNumber}
              </div>
              <div>
                From: {booking.FlightDetails.departureAirportId} to{" "}
                {booking.FlightDetails.arrivalAirportId}
              </div>
              <div>
                Departure Time:{" "}
                {new Date(booking.FlightDetails.departureTime).toLocaleString()}
              </div>
              <div>
                Tickets: {booking.numOfSeats} - Total Cost: ₹{booking.totalCost}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No past bookings.</p>
      )}
    </div>
  );
};

export default BookingHistory;
