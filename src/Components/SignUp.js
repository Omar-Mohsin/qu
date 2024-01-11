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
    confirm_password: "",
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (data.password !== data.confirm_password) {
      alert("Passwords do not match");
      return;
    }
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:80/api/v1/users/open",
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
      if (error.response) {
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
          <div className="bg-white p-8 rounded-lg shadow-md w-1/4 text-gray-500">
            <h1 className="text-4xl mb-6 text-blue-600 font-semibold text-center">
              Sign Up
            </h1>

            <div className="space-y-4">
              <InputField
                label="Full Name"
                name="full_name"
                value={data.full_name}
                type="text"
                onChange={onChange}
                placeholder="Full Name"
              />
              <InputField
                label="Email"
                name="email"
                value={data.email}
                onChange={onChange}
                type="email"
                placeholder="Email"
              />
              <InputField
                label="Password"
                name="password"
                value={data.password}
                onChange={onChange}
                type="password"
                placeholder="Password"
              />
              <InputField
                label="Confirm Password"
                name="confirm_password"
                value={data.confirm_password}
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
              />
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={onSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
              <Link to="/login" className="text-blue-500 ml-4">
                Already have an account? Login here.
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-white">
          <p className="text-2xl">You are already logged in.</p>
          <Link to="/profile" className="text-blue-300 mt-2 inline-block">
            Go to Profile
          </Link>
        </div>
      )}
    </>
  );
}

export default SignUp;
