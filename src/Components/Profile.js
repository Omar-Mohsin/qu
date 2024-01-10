import React from "react";
import UserInformation from "./UserInformation";
import { SelectUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Profile() {
  const user = useSelector(SelectUser);
  const navigate = useNavigate();
  const navigateRestPassword = () => {
    navigate("/rest-password");
  };
  const navigateEditProfile= () => {
    navigate("/edit-profile");
  };
  console.log(user);
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
        <div>
          <Link to="/login">please login</Link>
        
        </div>
      )}
    </>
  );
}

export default Profile;
