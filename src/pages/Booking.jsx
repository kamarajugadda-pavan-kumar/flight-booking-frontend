import React, { useContext } from "react";

import { BookingContext } from "../context/Bookingcontext";
import { UserContext } from "../context/UserContext";
import BookingOverview from "../components/booking/BookingOverview";
import SeatSelection from "../components/booking/SeatSelection";
import PassengerDetails from "../components/booking/PassengerDetails";

const BookingPage = () => {
  const {
    flight,
    booking,
    seats,
    loading,
    step,
    setStep,
    selectedSeats,
    passengers,
    bookSeatsAndProceedToPayment,
  } = useContext(BookingContext);
  const { user } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!flight || !booking || !seats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Failed to load booking/flight details</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex">
        <div className="flex-1 p-4">
          {/* Sidebar Steps */}
          <div className="flex">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Booking Process</h2>
              <ul className="mt-4 space-y-2">
                <li className={step === 1 ? "font-bold" : ""}>Login user</li>
                <li className={step === 2 ? "font-bold" : ""}>Select seats</li>
                <li className={step === 3 ? "font-bold" : ""}>
                  Passenger Details
                </li>
                <li className={step === 4 ? "font-bold" : ""}>
                  Review and Confirm
                </li>
              </ul>
            </div>

            {/* Step 1: Login */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Step 1: Login</h3>
                <div className="p-2">
                  <span className="font-bold">User logged</span> :{" "}
                  {user.emailId}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="p-2 bg-indigo-600 text-white rounded-md"
                >
                  Continue to Seat Selection
                </button>
              </div>
            )}

            {/* Step 2: Seat Selection */}
            {step === 2 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Step 2: Select Seats
                </h3>
                <SeatSelection />
                <button
                  onClick={() => setStep(3)}
                  disabled={selectedSeats.length !== booking.numOfSeats}
                  className="mt-4 p-2 bg-indigo-600 text-white rounded-md"
                >
                  Continue to Passenger Details
                </button>
              </div>
            )}

            {/* Step 3: Passenger Details */}
            {step === 3 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Step 3: Enter Passenger Details
                </h3>
                <PassengerDetails />
                <button
                  onClick={() => setStep(4)}
                  className="mt-4 p-2 bg-indigo-600 text-white rounded-md"
                >
                  Continue to Review
                </button>
              </div>
            )}

            {/* Step 4: Review Booking */}
            {step === 4 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Step 4: Review Booking
                </h3>
                <div className="mb-4">
                  <h4 className="font-bold">Flight Information</h4>
                  <p>
                    {flight.departureAirportId} to {flight.arrivalAirportId}
                  </p>
                  <p>Flight Number: {flight.flightNumber}</p>
                  <p>Price per Ticket: ₹{flight.price}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-bold">Selected Seats</h4>
                  <p>{selectedSeats.join(", ")}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-bold">Passenger Details</h4>
                  {passengers.map((passenger, index) => (
                    <p key={index}>
                      {passenger.name}, Age: {passenger.age}
                    </p>
                  ))}
                </div>
                <button
                  onClick={bookSeatsAndProceedToPayment}
                  className="mt-4 p-2 bg-green-600 text-white rounded-md"
                >
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex-2">
          <BookingOverview />
        </div>
      </div>
    </>
  );
};

export default BookingPage;

// <button
//   className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
//   onClick={handlePayment}
// >
//   Proceed to Payment
// </button>
