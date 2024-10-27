import { useContext } from "react";
import { BookingContext } from "../../context/Bookingcontext";

const SeatSelection = () => {
  const { seats, booking, selectedSeats, setSelectedSeats } =
    useContext(BookingContext);
  const { availableSeats, bookedSeats } = seats;
  const maxSeats = booking.numOfSeats;

  // Combine both available and booked seats and order them by row and col
  const allSeats = [...(availableSeats || []), ...(bookedSeats || [])].sort(
    (a, b) => {
      if (a.row === b.row) {
        return a.col.localeCompare(b.col); // Sort alphabetically by column if in the same row
      }
      return a.row - b.row; // Sort numerically by row
    }
  );

  const handleSeatClick = (seat) => {
    // Prevent clicking booked seats
    if (bookedSeats && bookedSeats.some((s) => s.seatId === seat.seatId))
      return;

    if (selectedSeats.includes(seat.seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seatId));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats([...selectedSeats, seat.seatId]);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      {allSeats.map((seat) => {
        const isBooked =
          bookedSeats && bookedSeats.some((s) => s.seatId === seat.seatId);
        const isSelected = selectedSeats.includes(seat.seatId);

        return (
          <div
            key={seat.seatId}
            onClick={() => handleSeatClick(seat)}
            className={`p-0 border rounded text-center ${
              isBooked
                ? "bg-red-500 text-white cursor-not-allowed" // Booked seats styled as red and not clickable
                : isSelected
                ? "bg-green-500 text-white"
                : "bg-gray-200 cursor-pointer"
            }`}
          >
            {seat.row}
            {seat.col}
          </div>
        );
      })}
    </div>
  );
};

export default SeatSelection;
