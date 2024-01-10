import React from "react";
import UserInformation from "./UserInformation";
import { SelectUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Profile() {
  const user = useSelector(SelectUser);
  const navigate = useNavigate();
  const navigateRestPassword = () => {
    navigate("/rest-password");
  };
  const navigateEditProfile= () => {
    navigate("/edit-profile");
  };
  return (
    <>
      {user ? (
        <div>
          <div>
            <UserInformation />
            <button onClick={navigateRestPassword}>rest password</button>
            <button onClick={navigateEditProfile}>edit profile</button>
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
