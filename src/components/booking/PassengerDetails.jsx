import { useContext } from "react";
import { BookingContext } from "../../context/Bookingcontext";

const PassengerDetails = () => {
  const { selectedSeats, passengers, setPassengers } =
    useContext(BookingContext);
  const handleChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      seatId: selectedSeats[index],
      [field]: value,
    };
    setPassengers(updatedPassengers);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left text-gray-600 font-semibold">
              Seat ID
            </th>
            <th className="py-2 px-4 text-left text-gray-600 font-semibold">
              Name
            </th>
            <th className="py-2 px-4 text-left text-gray-600 font-semibold">
              Age
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedSeats.map((seatId, index) => (
            <tr key={seatId} className="border-t">
              <td className="py-2 px-4 font-medium text-gray-700">{seatId}</td>
              <td className="py-2 px-4">
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Name"
                  value={passengers[index]?.name || ""}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Age"
                  value={passengers[index]?.age || ""}
                  onChange={(e) => handleChange(index, "age", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PassengerDetails;
