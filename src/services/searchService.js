import config from "../config";
import axios from "axios";

// flights search service
const searchFlightsService = async (
  departureCity,
  arrivalCity,
  departureDate,
  priceRange,
  sort,
  travellers
) => {
  try {
    const response = await axios.get(
      `${config.baseUrl}/flight-search/api/v1/flights?trips=${departureCity}-${arrivalCity}-${departureDate}&price=${priceRange}&sort=${sort}&travellers=${travellers}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to search flights. Please try again.");
  }
};

// fetch flight details
const fetchFlightDetailsService = async (flightId) => {
  try {
    const response = await axios.get(
      `${config.baseUrl}/flight-search/api/v1/flight/${flightId}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch flight details. Please try again.");
  }
};

export { searchFlightsService, fetchFlightDetailsService };
