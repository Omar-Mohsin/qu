import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import InputField from "./InputField";
import { addUser } from "../redux/auth/authSlice";
import { SelectUser } from "../redux/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

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

  const onChangPassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = async () => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://bashars.eu:5555/api/v1/login/access-token",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );

      dispatch(addUser(response.data));
      navigate("/profile");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-200 ">
      {!user ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-2/4">
          <h1 className="text-4xl mb-4 text-blue-600">
            Welcome Back!
          </h1>
          <p className="text-red-500 mb-4">{error.detail}</p>

          <div className="h-48 flex flex-col justify-between mb-6">
            <InputField
              label="Username"
              name="username"
              value={username}
              type="email"
              onChange={onChangeUsername}
              placeholder="Username"
              className="mb-4 h-14 border-2 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <InputField
              label="Password"
              name="password"
              value={password}
              type="password"
              onChange={onChangPassword}
              placeholder="Password"
              className="mb-4 h-14 border-2 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between w-auto mt-6">
            <button
              onClick={onSubmitHandler}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded  transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
            <Link to="/forget-password" className="text-blue-500 ml-4 ">
              Forgot your password?
            </Link>
          </div>

          <div className="flex justify-between items-center mt-8">
            <Link to="/sign-up" className="text-blue-500">
              Don't have an account? Sign up here.
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/profile" className="text-blue-500">
            Go to profile
          </Link>
        </div>
      )}
    </div>
  );
}

export default Login;
