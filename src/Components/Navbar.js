import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SelectUser } from "../redux/auth/authSlice";
import { removeUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector(SelectUser);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <>
      <div className="h-16 flex justify-between items-center bg-blue-600 px-4 md:px-6 text-white">
        <div>
          <Link to="/">
            <h1 className="text-lg md:text-2xl font-bold">Quantum System</h1>
          </Link>
        </div>

        <div className="flex items-center">
          {user ? (
            <>
              <Link
                to="/campaign"
                className="ml-2 md:ml-4 text-sm md:text-lg hover:text-gray-300"
              >
                Campaign
              </Link>
              <Link
                to="/profile"
                className="ml-2 md:ml-4 text-sm md:text-lg hover:text-gray-300"
              >
                Profile
              </Link>
            </>
          ) : null}

          {user ? (
            <p
              className="ml-4 md:ml-6 cursor-pointer text-sm md:text-lg hover:text-gray-300"
              onClick={logout}
            >
              Logout
            </p>
          ) : (
            <Link
              to="/login"
              className="ml-4 md:ml-6 text-sm md:text-lg hover:text-gray-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Navbar;
