import axios from 'axios';
import React, { useState } from 'react';
import { SelectUser } from '../redux/auth/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
function Campaign() {
  const navigate = useNavigate();
  const user = useSelector(SelectUser);
  const [campaign, setCampaign] = useState();

  const onClickSearchCampaign = () => {
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
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-gray-800 flex flex-col items-center">
        {user ? (
          <>
            <h1 className="text-4xl mb-6 text-blue-600 font-semibold">
               Campaign Search 
            </h1>
            <button
              onClick={onClickSearchCampaign}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search Campaign
            </button>
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
