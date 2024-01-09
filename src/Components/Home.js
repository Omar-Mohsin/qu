import React from 'react'
import { useSelector } from 'react-redux'
import { SelectUser } from '../redux/auth/authSlice'
import Welcome from './Welcome'
import Login from './Login'
function Home() {
    const user =  useSelector(SelectUser);
  return (
    <div>

    {
      user ? <Welcome/> : <Login/>
    }
    
   </div>
  )
}

export default Home