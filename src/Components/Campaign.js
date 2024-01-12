import axios from 'axios';
import React, { useState } from 'react';
import { SelectUser } from '../redux/auth/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { SelectUserDetails } from '../redux/auth/authSlice';

function Campaign() {
  const navigate = useNavigate();
  const user = useSelector(SelectUser);
  const userDetails = useSelector(SelectUserDetails);
  const [campaign, setCampaign] = useState();
  const [myCampaign, setMyCampaign] = useState();

  const onClickGetMyCampaign = () => {
    axios
      .get(`http://localhost:80/api/v1/campaign/byid/${userDetails?.id}`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        setMyCampaign(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const navigateToCreateCampaign = () => {
    navigate('/create-campaign')
  }

  const onClickGetAllCampaigns = () => {
    axios
      .get('http://localhost:80/api/v1/campaign/', {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        setCampaign(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-gray-800 flex flex-col items-center space-y-8 w-2/4">
        {user ? (
          <>
            <h1 className="text-3xl text-green-600 font-semibold">
              Welcome, {userDetails?.full_name}!
            </h1>

            <button
              onClick={onClickGetAllCampaigns}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Get All Campaigns
            </button>

            <div className="flex flex-col items-center">
              <button
                onClick={onClickGetMyCampaign}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Get My Campaign
              </button>
            </div>
            <button
              onClick={navigateToCreateCampaign}
              className="bg-gray-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Campaign
            </button> 

            {myCampaign && (
              <div className="mt-6 p-4 bg-green-100 rounded-md">
                <h2 className="text-xl font-semibold mb-2">My Campaign:</h2>
                <pre className="whitespace-pre-wrap text-gray-800">{JSON.stringify(myCampaign, null, 2)}</pre>
              </div>
            )}

            {campaign && (
              <div className="mt-6 p-4 bg-blue-100 rounded-md">
                <h2 className="text-xl font-semibold mb-2">All Campaigns:</h2>
                <pre className="whitespace-pre-wrap text-gray-800">{JSON.stringify(campaign, null, 2)}</pre>
              </div>
            )}
          </>
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

export default Campaign;
