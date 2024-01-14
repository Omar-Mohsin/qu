import React, { useEffect } from "react";
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
  }, [user.full_name]);

  return (
    <div className="min-h-screen flex items-center justify-center text-black">
    {
      user ? (
        <div className="flex justify-center">
          <p className="text-lg">Welcome, {userDetails?.full_name}</p>
        </div>
      ) : (
    
        <div>
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </Link>
          </div>
      )
    }
      
    </div>
  );
}

export default Home;
