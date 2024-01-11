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
        "http://bashars.eu:5555/api/v1/reset-password/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error(error.response.data);
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {user ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-2/4">
          <h1 className="text-3xl mb-4 text-blue-500 font-semibold">
            Reset Password
          </h1>

          <InputField
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={onChangeNewPassword}
          />

          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-6 transition duration-300"
            onClick={onSubmit}
          >
            Reset Password
          </button>

        </div>
      ) : (
        <div>
          <Link to="/login" className="text-blue-500">Please login</Link>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
