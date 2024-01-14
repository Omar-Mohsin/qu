import React, { useState } from "react";
import { SelectUser } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import InputField from "./InputField";
import { Link } from "react-router-dom";

function ResetPassword() {
  const user = useSelector(SelectUser);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const onChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      token: user.access_token,
      new_password: newPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:80/api/v1/reset-password/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    {user ? (
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-xl md:text-3xl mb-4 text-blue-500 font-semibold">
          Reset Password
        </h1>

        <InputField
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={onChangeNewPassword}
          className="mb-4 h-12 md:h-14 border-2 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          className="mb-4 h-12 md:h-14 border-2 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded mt-4 md:mt-6 transition duration-300"
          onClick={onSubmit}
        >
          Reset Password
        </button>
      </div>
    ) : (
      <div className="text-center">
        <Link to="/login" className="text-blue-500">
          Please login
        </Link>
      </div>
    )}
  </div>
  );
}

export default ResetPassword;
