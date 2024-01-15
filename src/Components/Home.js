import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SelectUser } from "../redux/auth/authSlice";
import { SelectUserDetails } from "../redux/auth/authSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../redux/auth/authSlice";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector(SelectUser);
  const userDetails = useSelector(SelectUserDetails);
  const [myCampaign, setMyCampaign] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:80/api/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(addUserDetails(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user?.full_name]);

  useEffect(() => {
    axios
      .get(`http://localhost:80/api/v1/campaign/byid/${userDetails?.id}`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setMyCampaign(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div className="flex flex-col p-4 md:p-8 mt-12 md:mt-40">
      {user ? (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:mr-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-3xl mb-4">Latest Campaigns</h1>
              <div className="flex gap-4 md:mr-8 mt-1">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm">
                  Import a Campaign
                </button>
                <Link to="/create-campaign">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md text-sm">
                    Create a Campaign
                  </button>
                </Link>
              </div>
            </div>

            {/* Placeholder content */}
            <div>
              <p>Your campaign content goes here.</p>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="w-1 h-18 bg-gray-500 mx-4"></div>

          {/* Workspace section */}
          <div className="w-full md:w-2/4 pl-0 md:pl-8 md:mt-0 mt-8">
            <h1 className="text-2xl md:text-3xl mb-4">Other Workspaces</h1>
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Workspace 2</h2>
              </div>

              <div className="flex flex-col">
                <p className="text-sm text-gray-600">Created at</p>
                <p className="text-sm text-gray-600">Created by</p>
              </div>
              {/* Placeholder for icons */}
              <div className="flex items-center gap-2">
                <span className="text-2xl"></span>
                <span className="text-2xl"></span>
              </div>
              <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md">
                Switch Workspace
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center w-full md:w-1/2 pr-0 md:pr-8">
          <Link to="/login">
            <h1 className="text-2xl md:text-4xl mb-6 text-red-600 font-semibold">
              Please Login
            </h1>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
