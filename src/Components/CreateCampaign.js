import React, { useState } from "react";
import InputField from "./InputField";
import { SelectUser } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

function CreateCampaign() {
  const user = useSelector(SelectUser);
  const navigate = useNavigate();
  const [values, setValues] = useState([]);
  const [data, setData] = useState({
    campaign_name: "",
    target: [],
    platform: [],
    is_public_web: true,
    it_dark_web: false,
    start_data: "",
    end_data: "",
  });
  const top100Films = [];

  const [error, setError] = useState();
  const [message, setMessage] = useState("");
  const onChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  function toggleCheckbox(arr, value) {
    if (arr.includes(value)) {
      return arr.filter((item) => item !== value);
    } else {
      return [...arr, value];
    }
  }

  const goToCampaign = () => {
    navigate("/campaign");
  };

  const onChangeValues = (event, newValue) => {
    console.log(newValue);

    setValues(newValue);
  };
  const onSubmitHandler = () => {
    const formattedData = {
      ...data,
      start_date: new Date(data.start_data).toISOString(),
      end_date: new Date(data.end_data).toISOString(),
    };

    if (formattedData.campaign_name === "") {
      alert("Name of the campaign is required");
      return;
    } else if (formattedData.start_date === "") {
      alert("Start date is required");
      return;
    } else if (formattedData.end_date === "") {
      alert("End date is required");
      return;
    }

    const sendedData = {
      campaign_name: formattedData.campaign_name,
      is_dark_web: false,
      is_public_web: true,
      target:
        {
          keywords: values,
        } || {},
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
        setMessage("Campaign created successfully");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-4 md:p-8 rounded-lg md:w-2/3 lg:w-1/2 xl:w-1/3 text-gray-800 flex flex-col items-center space-y-4 overflow-auto">
        {" "}
        {user ? (
          <div className="w-full max-w-md">
            {error && (
              <p className="text-red-500 mb-4 bg-red-100 border border-red-400 rounded p-2">
                {error?.detail}
              </p>
            )}
            <div className="mb-10 flex justify-center text-2xl">
              Create Campaign
            </div>

            <InputField
              type="text"
              placeholder="Campaign Name"
              label="Campaign Name"
              name="campaign_name"
              onChange={onChange}
              className="mb-4"
            />
            <Autocomplete
              multiple
              id="tags-filled"
              freeSolo
              className="mb-5"
              options={top100Films?.map((option) => option.title)}
              value={values}
              onChange={onChangeValues}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  placeholder="keywords"
                  label="keywords"
                />
              )}
            />
            <div className="mb-4">
              <p className="font-semibold mb-2">Platform:</p>
              <div className="flex flex-wrap gap-4">
                <div>
                  <label>
                    Facebook
                    <Checkbox
                      size="small"
                      checked={data.platform.includes("Facebook")}
                      onChange={() =>
                        setData({
                          ...data,
                          platform: toggleCheckbox(data.platform, "Facebook"),
                        })
                      }
                    />
                  </label>
                </div>
                <div>
                  <label>
                    LinkedIn
                    <Checkbox
                      size="small"
                      checked={data.platform.includes("LinkedIn")}
                      onChange={() =>
                        setData({
                          ...data,
                          platform: toggleCheckbox(data.platform, "LinkedIn"),
                        })
                      }
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Telegram
                    <Checkbox
                      size="small"
                      checked={data.platform.includes("Telegram")}
                      onChange={() =>
                        setData({
                          ...data,
                          platform: toggleCheckbox(data.platform, "Telegram"),
                        })
                      }
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Instagram
                    <Checkbox
                      size="small"
                      checked={data.platform.includes("Instagram")}
                      onChange={() =>
                        setData({
                          ...data,
                          platform: toggleCheckbox(data.platform, "Instagram"),
                        })
                      }
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Youtube
                    <Checkbox
                      size="small"
                      checked={data.platform.includes("Youtube")}
                      onChange={() =>
                        setData({
                          ...data,
                          platform: toggleCheckbox(data.platform, "Youtube"),
                        })
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            <InputField
              type="datetime-local"
              placeholder="Start Date"
              label="Start Date"
              name="start_data"
              onChange={onChange}
              className="mb-4"
            />
            <InputField
              type="datetime-local"
              placeholder="End Date"
              label="End Date"
              name="end_data"
              onChange={onChange}
              className="mb-4"
            />
            <div className="flex justify-center flex-col">
            <button
              onClick={onSubmitHandler}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Campaign
            </button>
            <button
              onClick={goToCampaign}
              className="bg-green-500 hover:bg-green-600 mt-4 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            >
              Back to Campaign Page
            </button>
            </div>
            {message && (
              <p className="text-green-500 mt-4 bg-green-100 border border-green-400 rounded p-2">
                {message}
              </p>
            )}
          </div>
        ) : (
          <>
            <Link to={"/login"}>
              <h1 className="text-4xl mb-6 text-red-600 font-semibold">
                Please Login
              </h1>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateCampaign;
