import React, { useState } from "react";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/auth/authSlice";
import axios from "axios";
import { SelectUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const user = useSelector(SelectUser);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = async () => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost:80/api/v1/login/access-token",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );

      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
        console.error(error.response.data);
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
    {!user ? (
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md md:w-1/2 lg:w-1/3 text-gray-500">
        <h1 className="text-2xl md:text-4xl mb-4 text-blue-600 font-semibold text-center">
          Welcome Back!
        </h1>
        <p className="text-red-500 mb-4">{error.detail}</p>

        <div className="space-y-4">
          <InputField
            label="Username"
            name="username"
            value={username}
            type="email"
            onChange={onChangeUsername}
            placeholder="Username"
          />
          <InputField
            label="Password"
            name="password"
            value={password}
            type="password"
            onChange={onChangePassword}
            placeholder="Password"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-6">
          <button
            onClick={onSubmitHandler}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 md:mb-0"
          >
            Login
          </button>
          <Link to="/forget-password" className="text-blue-500 md:ml-4">
            Forgot your password?
          </Link>
        </div>

        <div className="flex justify-center md:justify-between items-center mt-8">
          <Link to="/sign-up" className="text-blue-500 mb-4 md:mb-0">
            Don't have an account? Sign up here.
          </Link>
        </div>
      </div>
    ) : (
      <div className="text-center text-black">
        <p className="text-xl md:text-2xl">You are already logged in.</p>
        <Link to="/profile" className="text-blue-600 mt-2 inline-block">
          Go to Profile
        </Link>
      </div>
    )}
  </div>
  );
}

export default Login;
