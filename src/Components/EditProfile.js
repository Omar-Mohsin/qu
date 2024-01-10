import React, { useState } from "react";
import { SelectUserDetails } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";
import { SelectUser } from "../redux/auth/authSlice";
import axios from "axios";
import InputField from "./InputField";
import { Link } from "react-router-dom";
function EditProfile() {
  const userDetails = useSelector(SelectUserDetails);
  const user = useSelector(SelectUser);
  const [data, setData] = useState({
    password: "",
    email: userDetails?.email,
    full_name: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const onChangeprofile = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const onSubmitHandler = async () => {
    try {
      const response = await axios.put(
        "http://bashars.eu:5555/api/v1/users/me",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      console.log(response.data);
      setMessage("profile updated");
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);

        setError(error.response.data);
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  };
  return (
    <div>
      {user ? (
        <div>
          <InputField
            label="change the full name"
            name="full_name"
            value={data.full_name}
            type="text"
            onChange={onChangeprofile}
            placeholder="full name"
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

          {error ? <div>{error}</div> : ""}
          {message ? <div>{message}</div> : ""}
        </div>
      ) : (
        <>
          {" "}
          <Link to="/login">please log in </Link>
        </>
      )}
    </div>
  );
}

export default EditProfile;
