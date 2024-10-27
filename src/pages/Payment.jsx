import React, { useState, useEffect, useContext } from "react";
import { fetchBooking, makePayment } from "../services/bookingservice";
import { showFailureToast, showSuccessToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const params = new URLSearchParams(location.search);
  const bookingId = params.get("bookingId");
  const [cardNumber, setCardNumber] = useState("1234 5678 9876 5432");
  const [expiryDate, setExpiryDate] = useState("12/25");
  const [cvv, setCvv] = useState("123");
  const [nameOnCard, setNameOnCard] = useState("John Doe");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  const fetchData = async (bookingId) => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      const bookingDetails = await fetchBooking(bookingId, token);
      setBooking(bookingDetails);
    } catch (error) {
      console.log(error);
      showFailureToast("Failed to load booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(bookingId);
  }, [location.search]);

  const handlePayment = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      await makePayment(bookingId, {}, token);
      showSuccessToast("Payment successful! Your booking has been confirmed.");
      setTimeout(() => navigate("/payment-success"), 1000);
    } catch (error) {
      console.log(error);
      showFailureToast("Failed to make payment");
      setTimeout(() => navigate("/payment-failure"), 1000);
    }
  };

  return loading ? (
    <>loading...</>
  ) : (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name on Card</label>
          <input
            type="text"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Total Amount</label>
          <p className="text-lg font-bold">₹{booking.totalCost}</p>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
