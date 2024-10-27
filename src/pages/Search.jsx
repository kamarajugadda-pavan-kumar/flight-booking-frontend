import React, { useContext, useEffect, useState } from "react";
import config from "../config";
import { formatTime } from "../utils/timeFormatting";
import { useNavigate } from "react-router-dom";
import { searchFlightsService } from "../services/searchService";
import { showFailureToast, showSuccessToast } from "../utils/toast";
import authService from "../services/authService";
import { UserContext } from "../context/UserContext";
import { initiateBooking } from "../services/bookingservice";

const SearchFlights = () => {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [flights, setFlights] = useState([]);
  const [departureDate, setDepartureDate] = useState("");
  const [date, setDate] = useState(null);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const cities = [
    { code: "HYD", name: "Hyderabad" },
    { code: "BOM", name: "Mumbai" },
    { code: "DEL", name: "Delhi" },
    { code: "BLR", name: "Bangalore" },
    // Add more cities as needed
  ];

  useEffect(() => {
    setShowErrorPage(false);
    const params = new URLSearchParams(location.search);

    const departureCity = params.get("departureCity");
    const arrivalCity = params.get("arrivalCity");
    const date = params.get("date");
    const priceRange = params.get("priceRange");
    const sort = params.get("sort");
    const travellers = params.get("travellers");

    if (
      departureCity &&
      arrivalCity &&
      date &&
      priceRange &&
      sort &&
      travellers
    ) {
      setDepartureCity(departureCity);
      setArrivalCity(arrivalCity);
      setDate(date);
      setPriceRange(priceRange);
      setSort(sort);
      setTravellers(travellers);

      searchFlightsService(
        departureCity,
        arrivalCity,
        formatDateToDDMMYYYY(date),
        priceRange,
        sort,
        travellers
      )
        .then((data) => setFlights(data))
        .catch((err) => {
          setShowErrorPage(true);
        });
    }
  }, [location.search]);

  useEffect(() => {
    setDepartureDate(formatDateToDDMMYYYY(date));
  }, [date]);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      departureCity,
      arrivalCity,
      date,
      priceRange,
      sort,
      travellers,
    }).toString();

    navigate(`/search-flights?${params}`);
  };

  // Helper function to format date as DDMMYYYY
  const formatDateToDDMMYYYY = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = d.getFullYear();
    return `${day}${month}${year}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Search Flights</h2>
      <form onSubmit={handleSearch} className="flex gap-4 items-center mb-6">
        <div className="w-1/6">
          <label htmlFor="departureCity" className="block text-sm font-medium">
            Departure City
          </label>
          <select
            id="departureCity"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="" disabled selected>
              Select City
            </option>
            {cities.map((city) => (
              <option key={city.code} value={city.code}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/6">
          <label htmlFor="arrivalCity" className="block text-sm font-medium">
            Arrival City
          </label>
          <select
            id="arrivalCity"
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="" disabled selected>
              Select City
            </option>
            {cities.map((city) => (
              <option key={city.code} value={city.code}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/6">
          <label htmlFor="departureDate" className="block text-sm font-medium">
            Departure Date
          </label>
          <input
            type="date"
            id="departureDate"
            className="input input-bordered w-full max-w-xs"
            value={date}
            onChange={(e) =>
              // setDepartureDate(formatDateToDDMMYYYY(e.target.value))
              setDate(e.target.value)
            }
          />
        </div>

        <div className="w-1/6">
          <label htmlFor="priceRange" className="block text-sm font-medium">
            Price Range
          </label>
          <select
            id="priceRange"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="" disabled selected>
              Select Price Range
            </option>
            <option value="500-1000">₹500 - ₹1000</option>
            <option value="1000-5000">₹1000 - ₹5000</option>
            <option value="5000-10000">₹5000 - ₹10000</option>
            <option value="10000-20000">₹10000 - ₹20000</option>
            <option value="20000-30000">₹20000 - ₹30000</option>
            <option value="30000-40000">₹30000 - ₹40000</option>
            <option value="40000-50000">₹40000 - ₹50000</option>
            <option value="50000-100000">₹50000 - ₹100000</option>
          </select>
        </div>

        <div className="w-1/6">
          <label htmlFor="sort" className="block text-sm font-medium">
            Sort By
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select Option</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="departureTime_desc">
              Departure Time: Latest First
            </option>
            <option value="departureTime_asc">
              Departure Time: Earliest First
            </option>
            {/* Add more sorting options as needed */}
          </select>
        </div>

        <div className="w-1/6">
          <label htmlFor="travellers" className="block text-sm font-medium">
            Travellers
          </label>
          <select
            id="travellers"
            value={travellers}
            onChange={(e) => setTravellers(Number(e.target.value))}
            className="select select-bordered w-full"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Search Flights
        </button>
      </form>

      {/* Flight Results Section */}
      <div>
        <h3 className="text-xl font-bold mb-4">Available Flights</h3>
        {flights.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6">
            {flights.map((flight, index) => (
              <FlightListItem flight={flight} key={index} user={user} />
            ))}
          </ul>
        ) : (
          <>
            {showErrorPage ? (
              <>Some thing went wrong</>
            ) : (
              <p>No flights available.</p>
            )}
          </>
        )}
      </div>
      <SignInModal />
      <CreatingBookingIternaryModal />
    </div>
  );
};

const SignInModal = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    error && showFailureToast(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("hit api");
      const token = await authService.signInService(emailId, password);
      showSuccessToast("login successful");
      localStorage.setItem("token", token);
      document.getElementById("my_modal_1").close();
    } catch (err) {
      console.log(err);
      setError("Sign In failed. Please check your credentials.");
    }
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <div className="modal-action">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};

const CreatingBookingIternaryModal = () => {
  return (
    <dialog id="booking-iternary-modal" className="modal">
      <div className="modal-box flex flex-col items-center justify-center">
        {/* Loading Spinner or GIF */}
        <img
          src="/assets/booking-itenary-loading.webp"
          alt="Loading"
          className="mb-4"
        />
        {/* Loading Message */}
        <p className="text-lg font-semibold">Initializing your booking...</p>
      </div>
    </dialog>
  );
};

const FlightListItem = ({ flight, user }) => {
  const navigate = useNavigate();
  const handleBookNow = (flightId) => {
    if (user) {
      // create a new booking
      createBookingAndNavigateToBookingPage(flightId);
    } else {
      document.getElementById("my_modal_1").showModal();
    }
  };

  const createBookingAndNavigateToBookingPage = async (flightId) => {
    try {
      const params = new URLSearchParams(location.search);
      const numOfSeats = parseInt(params.get("travellers"));
      const token = localStorage.getItem("token");
      openFlightBookingLoadingModal();
      const bookingDetails = await initiateBooking(
        flightId,
        token,
        numOfSeats,
        user.id
      );
      const bookingId = bookingDetails.bookingId;
      navigate(`/book/${flightId}?bookingId=${bookingId}`);
    } catch (error) {
      console.log(error);
      showFailureToast("Something went wrong creating booking");
    } finally {
      closeFlightBookingLoadingModal();
    }
  };

  const openFlightBookingLoadingModal = () => {
    document.getElementById("booking-iternary-modal").showModal();
  };

  const closeFlightBookingLoadingModal = () => {
    document.getElementById("booking-iternary-modal").close();
  };

  return (
    <li
      key={flight.id}
      className="border p-6 rounded-lg shadow-lg flex justify-between items-center gap-6 bg-white"
    >
      {/* Left Section */}
      <div className="flex flex-col gap-2 w-2/3">
        <div className="text-2xl font-semibold text-indigo-600">
          {flight.departureAirportId} to {flight.arrivalAirportId}
        </div>
        <div className="text-lg font-medium">
          {flight.departureAirport.name} &#10142; {flight.arrivalAirport.name}
        </div>
        <div className="text-sm text-gray-500">
          Flight Number:{" "}
          <span className="font-medium">{flight.flightNumber}</span>
        </div>
        <div className="text-sm text-gray-500">
          Airplane: <span className="font-medium">{flight.airplane.name}</span>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Departure</span>
            <span className="text-md font-medium">
              {formatTime(flight.departureTime)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Arrival</span>
            <span className="text-md font-medium">
              {formatTime(flight.arrivalTime)}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/3 text-right flex flex-col justify-between">
        <div className="text-xl font-bold text-indigo-600">₹{flight.price}</div>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
          onClick={() => handleBookNow(flight.id)}
        >
          Book Now
        </button>
      </div>
    </li>
  );
};

export default SearchFlights;
