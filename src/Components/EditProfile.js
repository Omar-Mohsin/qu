import React, { useState } from "react";
import { SelectUserDetails } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";
import { SelectUser } from "../redux/auth/authSlice";
import axios from "axios";
import InputField from "./InputField";
import { Link } from "react-router-dom";

function EditProfile() {
  const userDetails = useSelector(SelectUserDetails);
  const user = useSelector(SelectUser);
  const [data, setData] = useState({
    password: "",
    email: userDetails?.email,
    full_name: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onChangeprofile = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = async () => {
    try {
      const response = await axios.put(
        "http://localhost:80/api/v1/users/me",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      console.log(response.data);
      setMessage("Profile updated successfully");
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        setError(error.response.data);
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {user ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-2/4">
          <h1 className="text-4xl mb-4 text-blue-600">Edit Profile</h1>

          <InputField
            label="Change Full Name"
            name="full_name"
            value={data?.full_name}
            type="text"
            onChange={onChangeprofile}
            placeholder="Full Name"
            className="mb-4 h-14 border-2 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <InputField
            label="Password"
            name="password"
            value={data?.password}
            type="password"
            onChange={onChangeprofile}
            placeholder="Password"
            className="mb-4 h-14 border-2 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={onSubmitHandler}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-6 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>

          {error ? <div className="text-red-500 mt-4">{error}</div> : ""}
          {message ? <div className="text-green-500 mt-4">{message}</div> : ""}
        </div>
      ) : (
        <div>
          <Link to="/login" className="text-blue-500">
            Please log in
          </Link>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
