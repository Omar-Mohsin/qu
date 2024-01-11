import React, { useState } from "react";
import InputField from "./InputField";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async () => {
    if (email === "") {
      alert("Please enter your email");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:80/api/v1/password-recovery/${email}`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-2/4">
        <h1 className="text-4xl mb-4 text-blue-600">Forgot Password</h1>

        <div className="mb-6">
          <InputField
            label="Email"
            name="email"
            value={email}
            type="email"
            onChange={onChangeEmail}
            placeholder="Email"
            className="h-14 border-2 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={onSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-5 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ForgetPassword;
