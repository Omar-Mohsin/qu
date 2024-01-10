import React , {useEffect , useState} from 'react'
import { SelectUser  } from '../redux/auth/authSlice';
import { useSelector , useDispatch } from 'react-redux';
import { addUserDetails } from '../redux/auth/authSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';    
function UserInformation() {

    const user = useSelector(SelectUser);

    const dispatch = useDispatch();
    const [data, setData] = useState(null);
  
  
  
    useEffect(() => {
  
      axios.get(`http://bashars.eu:5555/api/v1/users/me`, {
        headers: {
          'Authorization': `Bearer ${user.access_token}`
        }
      }).then((response) => {
        console.log(response.data);
        dispatch(addUserDetails(response.data));
        setData(response.data);
      }).catch((error) => {
        console.log(error);
      })
  
    } , [user])
  return (
    <div>

{
        user ? (
            <div>
        <h1> email :{data?.email}</h1> 
        <h1>is active  : {data?.is_active? "yes" : "no"}</h1>
        </div>
        
        ): <Link to='/login'><h1>Not Logged in</h1></Link>
    }
    </div>
  )
}

export default UserInformation