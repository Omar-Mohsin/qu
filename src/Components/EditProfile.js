import React, { useState } from "react";
import { SelectUserDetails } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SelectUser } from "../redux/auth/authSlice";
import axios from "axios";
import InputField from "./InputField";
function EditProfile() {
  const userDetails = useSelector(SelectUserDetails);
  const user = useSelector(SelectUser);
  const [data, setData] = useState({
    password: "",
    email: "",
    full_name: "",
    
  
  });
  const onChangeprofile = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const onSubmitHandler = async() => { 

    const data1 = {
      "password": "admin", 
      "email": "admin@quantum-systems.io",
      "full_name": "omar",
    }
    console.log(data1)
    try {
      const response = await axios.put(
        "http://bashars.eu:5555/api/v1/users/me",
        data1,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user.accress_token}`

          },
        }
      );
      console.log(response.data);
    } catch (error) {
      if (error.response ) {
        console.error(error.response.data);
      } else {
        console.error("An error occurred:", error.message);
      }
    }

  }
  return (
    <div>
    

    <InputField
        label="full name "
        name="full_name"
        value={data.full_name}
        type="text"
        onChange={onChangeprofile}
        placeholder="full name"
      />
          <InputField
        label="email "
        name="email"
        value={data.email}
        type="text"
        onChange={onChangeprofile}
        placeholder="email"
      />

<InputField
        label="password "
        name="password"
        value={data.password}
        type="text"
        onChange={onChangeprofile}
        placeholder="password"
      />

      <button onClick={onSubmitHandler}>save</button>
    </div>
  );
}

export default EditProfile;
