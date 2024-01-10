import React from "react";
import UserInformation from "./UserInformation";
import { SelectUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Profile() {
  const user = useSelector(SelectUser);
  const navigate = useNavigate();
  const onClickRestPassword = () => {
    navigate("/rest-password");
  };
  return (
    <>
      {user ? (
        <div>
          <div>
            <UserInformation />
            <button onClick={onClickRestPassword}>rest password</button>
            <button>Log out</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Profile;
