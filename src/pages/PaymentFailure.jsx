import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/search-flights"); // Redirect to flight search after failure
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
      <p className="text-lg">Unfortunately, your payment was not successful.</p>
      <button
        onClick={handleRetry}
        className="mt-6 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Retry Booking
      </button>
    </div>
  );
};

export default PaymentFailure;
