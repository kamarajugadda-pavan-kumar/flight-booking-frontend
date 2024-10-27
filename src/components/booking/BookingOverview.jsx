import React, { useContext } from "react";
import { BookingContext } from "../../context/Bookingcontext";

const BookingOverview = () => {
  const { flight, booking } = useContext(BookingContext);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">
          {flight.departureAirportId} to {flight.arrivalAirportId}
        </h3>
        <table className="table-auto w-full text-left border border-gray-300">
          <tbody>
            <tr className="border-b">
              <th className="px-4 py-2 font-medium">Flight Number</th>
              <td className="px-4 py-2 text-gray-600">{flight.flightNumber}</td>
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
              <td className="px-4 py-2 text-lg font-bold">₹{flight.price}</td>
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
    </div>
  );
};

export default BookingOverview;
