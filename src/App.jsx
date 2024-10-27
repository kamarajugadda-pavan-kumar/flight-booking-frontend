import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React from "react";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SearchFlights from "./pages/Search";
import BookFlight from "./pages/Booking";
import Payments from "./pages/Payment";
import BookingHistory from "./pages/BookingHistory";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { UserProvider } from "./context/UserContext";
import { BookingProvider } from "./context/Bookingcontext";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Navigate to={"/search-flights"} />} />
          <Route path="/search-flights" element={<SearchFlights />} />

          <Route
            path="/book/:flightId"
            element={
              <PrivateRoute
                element={
                  <BookingProvider>
                    <BookFlight />
                  </BookingProvider>
                }
              />
            }
          />
          <Route
            path="/payment"
            element={<PrivateRoute element={<Payments />} />}
          />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          <Route
            path="/booking-history"
            element={<PrivateRoute element={<BookingHistory />} />}
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
