import React from 'react'

import { useState } from 'react'
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux';
import InputField from './InputField';
import { addUser } from '../redux/auth/authSlice';
import { SelectUser } from '../redux/auth/authSlice';
function Login() {

  const dispatch = useDispatch();

  const user = useSelector(SelectUser)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
  
    const onChangeUsername = (event) => { 
      setUsername(event.target.value);
  
    }
    const onChangPassword = (event) => { 
  
      setPassword(event.target.value);
  
    }
  

    const onSubmitHandler = async () => {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      try {
          const response = await axios.post('http://bashars.eu:5555/api/v1/login/access-token', formData, {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json',
              }
          });
          
          console.log(response.data);
          dispatch(addUser(response.data));
      } catch (error) {
          if (error.response && error.response.status === 422) {
              console.error(error.response.data);
          } else {
              console.error("An error occurred:", error.message);
          }
      }
  };
  

  console.log(user);  
  

  return (
   <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <InputField label="Username" name="username" value={username} onChange={onChangeUsername} placeholder="Username"/>
      <InputField label="Password" name="password" value={password} onChange={onChangPassword} placeholder="Password"/>
      <button onClick={onSubmitHandler}>login</button>
    </div>
  )
}

export default Login