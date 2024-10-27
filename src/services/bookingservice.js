import config from "../config";
import axios from "axios";

// write services for booking
const initiateBooking = async (flightId, token, numOfSeats, userId) => {
  try {
    // Create URLSearchParams object to encode the body
    const formData = new URLSearchParams();
    formData.append("numOfSeats", numOfSeats);
    formData.append("userId", userId);

    const response = await axios.post(
      `${config.baseUrl}/flight-booking/api/v1/bookings/${flightId}`,
      formData, // send the encoded form data
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded", // set the header for URL-encoded data
        },
      }
    );
    console.log(response);

    return response.data.Data;
  } catch (err) {
    throw new Error("Failed to book flight. Please try again.");
  }
};

// cancel bookings
const cancelBooking = async (bookingId, token) => {
  try {
    const response = await axios.patch(
      `${config.baseUrl}/flight-booking/api/v1/bookings/cancel-booking/${bookingId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.message;
  } catch (err) {
    throw new Error("Failed to cancel booking. Please try again.");
  }
};

// fetch booking
const fetchBooking = async (bookingId, token) => {
  try {
    const response = await axios.get(
      `${config.baseUrl}/flight-booking/api/v1/bookings/${bookingId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.Data;
  } catch (err) {
    throw new Error("Failed to fetch booking details. Please try again.");
  }
};

// make payment
const makePayment = async (bookingId, paymentData, token) => {
  try {
    const response = await axios.patch(
      `${config.baseUrl}/flight-booking/api/v1/bookings/make-payment/${bookingId}`,
      paymentData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.message;
  } catch (err) {
    throw new Error("Failed to make payment. Please try again.");
  }
};

const fetchBookingHistory = async (userId, token) => {
  try {
    const response = await axios.get(
      `${config.baseUrl}/flight-booking/api/v1/booking-history/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch booking history. Please try again.");
  }
};

export {
  initiateBooking,
  cancelBooking,
  fetchBooking,
  makePayment,
  fetchBookingHistory,
};
