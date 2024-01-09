import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'  
import { useSelector } from 'react-redux';
import { SelectUser } from '../redux/auth/authSlice'; 
export default function WelcomingPage() {


  const user = useSelector(SelectUser);
  const [data, setData] = useState(null);



  useEffect(() => {

    axios.get(`http://bashars.eu:5555/api/v1/users/me`, {
      headers: {
        'Authorization': `Bearer ${user.access_token}`
      }
    }).then((response) => {
      console.log(response.data);
      setData(response.data);
    }).catch((error) => {
      console.log(error);
    })

  } , [user])
  return (
    <div>
      
      <h1>Welcome {data?.email}</h1>
      <p></p>
    </div>
  )
}
