import config from "../config";
import axios from "axios";

const fetchSeatAvailability = async (bookingId) => {
  try {
    const response = await axios.get(
      `${config.baseUrl}/flight-booking/api/v1/seats/${bookingId}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch seat availability. Please try again.");
  }
};

const seatBookingService = async (flightId, bookingId, passengers, token) => {
  try {
    const response = await axios.post(
      `${config.baseUrl}/flight-booking/api/v1/seat-booking`,
      {
        headers: { Authorization: `Bearer ${token}` },
        flightId,
        bookingId,
        passengers,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch seat availability. Please try again.");
  }
};

export { fetchSeatAvailability, seatBookingService };
