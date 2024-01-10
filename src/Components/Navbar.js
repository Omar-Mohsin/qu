import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
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
      <div className="h-12 flex w-full justify-between bg-black pt-4 ">
        <div className="ml-10 text-white ">
          <Link to="/">
            <h1>Quantum System</h1>
          </Link>
        </div>

        <div className="mr-10 text-white flex">
          {user ? (
            <Link to="/profile">
              <p>profile</p>
            </Link>
          ) : (
            ""
          )}

          {user ? (
            <p className=" ml-6 cursor-pointer " onClick={logout}>
              Logout
            </p>
          ) : (
            <Link to="/login">
              <p>Login</p>
            </Link>
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Navbar;
