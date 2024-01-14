import React from "react";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile"; 
import Login from "./Components/Login";
import RestPassword from "./Components/RestPassword";
import SignUp from "./Components/SignUp";
import ForgetPassword from "./Components/ForgetPassword";
import EditProfile from "./Components/EditProfile";
import CreateCampaign from "./Components/CreateCampaign";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route index path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={<Profile />  
            }
            />   
            <Route path="/rest-password" element={<RestPassword />} />
            <Route path="/sign-up" element={<SignUp />} />

            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/edit-profile" element={<EditProfile />} />

            <Route path="/create-campaign" element={<CreateCampaign />} />
            
             </Route>

        </Routes>

      </Router>
    </>
  );
}

export default App;
