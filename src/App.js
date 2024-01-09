
import React from 'react'
import Login from './Components/Login';
import WelcomingPage from './Components/WelcomingPage';
import { SelectUser } from './redux/auth/authSlice';
import { useSelector } from 'react-redux';
function App() {

const user = useSelector(SelectUser);
console.log(user);
  
  return (
    <>

     <div>

      {
        user ? <WelcomingPage/> : <Login/>
      }
      
     </div>

    </>
  );
}

export default App;
