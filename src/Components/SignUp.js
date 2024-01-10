import React, { useState } from "react";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { addUser } from "../redux/auth/authSlice";
import axios from "axios";
import { SelectUser } from "../redux/auth/authSlice"; 
import { useNavigate } from "react-router";
function SignUp() {
  const user = useSelector(SelectUser); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    password : "" , 
    email : "" ,
    full_name : "" ,
  })


  const onChange = (e) => {
    setData({...data , [e.target.name] : e.target.value})
  }

  const onsubmit = async() => {  

    console.log(data);
   
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

  } 



  return (
    <>
    {
      !user?(
<div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <InputField
        label="full name"
        name="full_name"
        value={data.full_name}
        type="text"

        onChange={onChange}
        placeholder="full name"
      />
       
         <InputField
        label="email"
        name="email"
        value={data.email}
        onChange={onChange}
        type="email"
        placeholder="email"
      />

      <InputField
        label="password"
        name="password"
        value={data.password}
        onChange={onChange}
        type="password"
        placeholder="password"
      />  

      <button onClick ={onsubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300">
        sign up
      </button>
      <Link to="/login" className="mt-5 text-blue-500"> if you have an account , please login</Link>
    </div>
      ):(
        <div className="">
          <Link to ="/profile">you are already logged in</Link>
        </div>
      )
    }
    
    </>
  );
}

export default SignUp;
