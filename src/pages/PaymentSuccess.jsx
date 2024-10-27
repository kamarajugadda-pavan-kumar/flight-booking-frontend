import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/booking-history"); // Redirect to booking history after success
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Payment Successful
      </h2>
      <p className="text-lg">Your booking has been confirmed!</p>
      <button
        onClick={handleContinue}
        className="mt-6 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Continue to Booking History
      </button>
    </div>
  );
};

export default PaymentSuccess;
