import React, { useEffect, useState } from "react";
import { SelectUser } from "../redux/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { addUserDetails } from "../redux/auth/authSlice";
import axios from "axios";
import { SelectUserDetails } from "../redux/auth/authSlice";
import { Link } from "react-router-dom";

function UserInformation() {
  const user = useSelector(SelectUser);
  const userDetails = useSelector(SelectUserDetails);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:80/api/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(addUserDetails(response.data));
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <div className="flex items-center">
      {true ? (
        <div className="bg-white p-4 md:p-8 rounded-lg md:w-2/3 lg:w-1/2 xl:w-1/3">
          <div className="mb-4">
            <p className="font-bold">Email:</p>
            <p>{data?.email}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Full Name:</p>
            <p>{userDetails?.full_name}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Is Active : </p>
            <p>{data?.is_active ? " Yes" : " No"}</p>
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
