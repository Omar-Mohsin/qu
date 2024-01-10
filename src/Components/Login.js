import React from "react";

import { useState } from "react";
import axios from "axios";
import {  useDispatch } from "react-redux";
import InputField from "./InputField";
import { addUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <p className="text-2xl mb-4 text-red-500 font-semibold">{error.detail}</p>

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
        onChange={onChangPassword}
        placeholder="Password"
      />

      <button
        onClick={onSubmitHandler}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
      >
        Login
      </button>
     <Link to='/sign-up'> if you dont have an account , please sign up</Link>

     <Link to='/forget-password'>forget a password</Link>
    </div>
  );
}

export default Login;
