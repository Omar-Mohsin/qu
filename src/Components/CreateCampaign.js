import React, { useState } from "react";
import InputField from "./InputField";
import { SelectUser } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

function CreateCampaign() {
  const user = useSelector(SelectUser);
  const navigate = useNavigate();
  const [data, setData] = useState({
    campaign_name: "",
    start_data: "",
    end_data: "",
  });

  const [error, setError] = useState();
  const [message, setMessage] = useState("");
  const onChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const goToLogin = () => {
    navigate("/login");
  };

  const onSubmitHandler = () => {
    const formattedData = {
      ...data,
      start_date: new Date(data.start_data).toISOString(),
      end_date: new Date(data.end_data).toISOString(),
    };

    if (formattedData.campaign_name === "") {
      alert("name of campaign is  required");
      return;
    } else if (formattedData.start_date === "") {
      alert("start date is  required");
      return;
    } else if (formattedData.end_date === "") {
      alert("end date is  required");
      return;
    }

    const sendedData = {
      campaign_name: formattedData.campaign_name,
      is_dark_web: false,
      is_public_web: true,
      target: formattedData.target || {},
      platform: formattedData.platform || [],
      start_date: formattedData.start_date,
      end_date: formattedData.end_date,
    };

    axios
      .post("http://localhost:80/api/v1/campaign/", sendedData, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage("campaign created successfully");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-gray-800 flex flex-col items-center">
        {user ? (
          <div>
            {error && (
              <p className="text-red-500 mb-4 bg-red-100 border border-red-400 rounded p-2">
                {error?.detail}
              </p>
            )}

            <InputField
              type="text"
              placeholder="Campaign Name"
              label={"Campaign Name"}
              name="campaign_name"
              onChange={onChange}
              className="mb-4"
            />
            <InputField
              type="datetime-local"
              placeholder="Start Date"
              label={"Start Date"}
              name="start_data"
              onChange={onChange}
              className="mb-4"
            />
            <InputField
              type="datetime-local"
              placeholder="End Date"
              label={"End Date"}
              name="end_data"
              onChange={onChange}
              className="mb-4"
            />
            <button
              onClick={onSubmitHandler}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Campaign
            </button>
            {message && (
              <p className="text-green-500 mt-4 bg-green-100 border border-green-400 rounded p-2">
                {message}
              </p>
            )}
          </div>
        ) : (
          <>
            <h1 className="text-4xl mb-6 text-red-600 font-semibold">
              Please Login
            </h1>
            <button
              onClick={goToLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Go to Login Page
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateCampaign;
