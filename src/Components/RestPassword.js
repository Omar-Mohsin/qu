import React, { useState } from "react";
import { SelectUser } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import InputField from "./InputField";

function RestPassword() {
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
    <div className="mt-10 p-20 ">
      {user ? (
        <div>
          <label>New password</label>
          <InputField
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={onChangeNewPassword}
          />
          <label>Confirm password</label>
          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onSubmit}
          >
            rest password
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default RestPassword;
