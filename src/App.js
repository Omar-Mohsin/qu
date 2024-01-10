import React from "react";
import { SelectUser } from "./redux/auth/authSlice";
import { useSelector } from "react-redux";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile"; 
import Login from "./Components/Login";
import RestPassword from "./Components/RestPassword";
import SignUp from "./Components/SignUp";
import ForgetPassword from "./Components/ForgetPassword";
import EditProfile from "./Components/EditProfile";
function App() {
  const user = useSelector(SelectUser);
  console.log(user);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="" />
            }
            />   
            <Route path="/rest-password" element={<RestPassword />} />
            <Route path="/sign-up" element={<SignUp />} />

            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/edit-profile" element={<EditProfile />} />


            
             </Route>

        </Routes>

      </Router>
    </>
  );
}

export default App;
