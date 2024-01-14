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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {user ? (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-black-500 mb-4 mt-10">
            Welcome, {userDetails?.full_name}
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">My Campaigns</h2>
            {myCampaign?.map((campaign) => (
              <div key={campaign.id} className="mb-6 p-4 border rounded-lg">
                <p className="text-xl font-semibold mb-2">
                  {campaign.campaign_name}
                </p>
                <p className="mb-2">{campaign.description}</p>
                <p className="mb-2">
                  <span className="font-semibold">Start Date:</span>{" "}
                  {campaign.start_date}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">End Date:</span>{" "}
                  {campaign.end_date}
                </p>
                <div className="mb-2">
                  <span className="font-semibold">Keywords:</span>{" "}
                  {campaign.target.keywords?.map((keyword, index) => (
                    <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full mr-2">
                      {keyword}
                    </span>
                  ))}
                </div>
                <div>
                  <span className="font-semibold">Platforms:</span>{" "}
                  {campaign.platform?.map((platform) => (
                    <span key={platform.id} className="text-gray-600 mr-2">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link to="/create-campaign">Create Campaign</Link>
            </button>
          </div>
        </div>
      ) : (
       <div className="flex justify-center items-center h-screen">
  <Link to="/login">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Login
    </button>
  </Link>
</div>

      )}
    </div>
  );
}

export default Home;
