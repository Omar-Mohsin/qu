import React, { useState } from "react";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/auth/authSlice";
import axios from "axios";
import { SelectUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router";

function SignUp() {
  const user = useSelector(SelectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    password: "",
    email: "",
    full_name: "",
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://bashars.eu:5555/api/v1/users/open",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      dispatch(addUser(response.data));
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error(error.response.data);
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  };

  return (
    <>
      {!user ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
          <div className="bg-white p-8 rounded-lg shadow-md w-2/4">
            <h1 className="text-4xl mb-4 text-blue-600">Sign Up</h1>

            <div className="h-48 flex flex-col justify-between mb-6">
              <InputField
                label="Full Name"
                name="full_name"
                value={data.full_name}
                type="text"
                onChange={onChange}
                placeholder="Full Name"
                className="mb-4 h-14 border-2 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputField
                label="Email"
                name="email"
                value={data.email}
                onChange={onChange}
                type="email"
                placeholder="Email"
                className="mb-4 h-14 border-2 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputField
                label="Password"
                name="password"
                value={data.password}
                onChange={onChange}
                type="password"
                placeholder="Password"
                className="mb-4 h-14 border-2 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between w-auto mt-20">
              <button
                onClick={onSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-6 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
              <Link to="/login" className="text-blue-500 ml-4 mt-6">
                Already have an account? Login here.
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/profile" className="text-blue-500">
            You are already logged in.
          </Link>
        </div>
      )}
    </>
  );
}

export default SignUp;
