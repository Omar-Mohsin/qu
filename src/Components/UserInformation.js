import React from "react";
import { useSelector } from "react-redux";
import { SelectUserDetails } from "../redux/auth/authSlice";
import { Link } from "react-router-dom";

function UserInformation() {
  const userDetails = useSelector(SelectUserDetails);

  return (
    <div className="flex items-center">
      {true ? (
        <div className="bg-white p-4 md:p-8 rounded-lg md:w-2/3 lg:w-1/2 xl:w-1/3">
          <div className="mb-4">
            <p className="font-bold">Email:</p>
            <p>{userDetails?.email}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Full Name:</p>
            <p>{userDetails?.full_name}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Is Active : </p>
            <p>{userDetails?.is_active ? " Yes" : " No"}</p>
          </div>
        </div>
      ) : (
        <Link to="/login" className="text-blue-500">
          <h1>Not Logged in. Please login.</h1>
        </Link>
      )}
    </div>
  );
}

export default UserInformation;
