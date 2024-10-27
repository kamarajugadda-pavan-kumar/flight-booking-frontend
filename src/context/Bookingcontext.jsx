import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showFailureToast } from "../utils/toast";
import { fetchFlightDetailsService } from "../services/searchService";
import { fetchBooking } from "../services/bookingservice";
import {
  fetchSeatAvailability,
  seatBookingService,
} from "../services/seatSevice";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { flightId } = useParams();
  const params = new URLSearchParams(location.search);
  const bookingId = params.get("bookingId");

  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [booking, setBooking] = useState(null);
  const [seats, setSeats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const fetchData = async (bookingId, flightId) => {
      try {
        setLoading(true);
        let token = localStorage.getItem("token");
        const flightDetails = await fetchFlightDetailsService(flightId);
        setFlight(flightDetails);

        const bookingDetails = await fetchBooking(bookingId, token);
        setBooking(bookingDetails);

        const seatsAvailability = await fetchSeatAvailability(bookingId);
        setSeats(seatsAvailability);
      } catch (error) {
        console.log(error);
        showFailureToast("Failed to load booking/flight details");
      } finally {
        setLoading(false);
      }
    };

    fetchData(bookingId, flightId);
  }, [location.search]);

  const bookSeatsAndProceedToPayment = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");

      await seatBookingService(flight.id, booking.bookingId, passengers, token);

      // Book seats and proceed to payment
      navigate("/payment?bookingId=" + bookingId);
    } catch (error) {
      console.log(error);
      showFailureToast("Failed to book seats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        flight,
        booking,
        seats,
        loading,
        step,
        setStep,
        selectedSeats,
        setSelectedSeats,
        passengers,
        setPassengers,
        bookSeatsAndProceedToPayment,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
