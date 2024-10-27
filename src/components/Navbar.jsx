import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { LogOut } from "lucide-react";
const Navbar = () => {
  const { logout } = useContext(UserContext);
  return (
    <div className="navbar bg-base-100 drop-shadow-lg flex justify-between sticky top-0 z-50">
      <Link to={"/"} className="btn btn-ghost text-xl">
        BookItFly
      </Link>

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className=" m-1">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              alt="User Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow border-2"
        >
          <li>
            <Link to={"/booking-history"}>Booking History</Link>
          </li>
          <li>
            <a href="#" className="flex justify-between" onClick={logout}>
              Logout
              <LogOut />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
