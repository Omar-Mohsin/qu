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
    <div>
      {user ? (
        <div >
          <div >
            <div >
              <h1 className="text-2xl font-semibold">Latest Campaigns</h1>
              <div className="flex space-x-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                  Import a Campaign
                </button>
                <Link to="/create-campaign" className="text-blue-500">
                  Create a Campaign
                </Link>
              </div>
            </div>
            <div className="bg-white p-4 shadow-md rounded-md">
              {/* Add your campaign details here */}
            </div>
          </div>

          <div className="w-1/2 space-y-4 flex-end">
            <h1 className="text-2xl font-semibold">Other Workspaces</h1>

            <div className="flex items-center space-x-4 mt-4">
              <div>
                <h2 className="text-lg font-semibold">Workspace 2</h2>
              </div>

              <div className="flex flex-col">
                <p>Additional details</p>
                <p>More details</p>
              </div>

              <div className="flex items-center space-x-2">
                {/* Add your icons here */}
              </div>

              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Switch Workspace
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center flex justify-center">
          <Link to={"/login"}>
            <h1 className="text-4xl mb-6 text-red-600 font-semibold">
              Please Login
            </h1>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
