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
      <div className="h-16 flex justify-between items-center  px-4 md:px-6 text-white">
        <div>
          <Link to="/">
            <h1 className="text-lg md:text-2xl font-bold text-black">Scavenger</h1>
          </Link>
        </div>

        <div className="flex items-center">
          {user ? (
            <>
                 <button>                
              <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-40 mr-6"
              
                to="#"
                >
                WorkSpace settings
              </Link>
              </button>
              <button>                
              <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-40"
              
                to="/profile"
                >
                Account
              </Link>
              </button>
            </>
          ) : null}

          {user ? (
          null
          ) : (
            <button className="bg-blue-500 ml-4 md:ml-6 px-4 py-2 rounded-md hover:bg-blue-700">
             
                Try now
            </button>
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Navbar;
