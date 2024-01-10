import React, { useState } from "react";
import InputField from "./InputField";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async () => {
    if (email === "") {
      alert("please enter your email");
      return;
    }
    axios
      .post(
        `http://bashars.eu:5555/api/v1/password-recovery/${email}`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <InputField
        label="email"
        name="email"
        value={email}
        type="email"
        onChange={onChangeEmail}
        placeholder="email"
      />
      <button onClick={onSubmit}>send</button>
    </div>
  );
}

export default ForgetPassword;
