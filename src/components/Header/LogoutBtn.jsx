import React from 'react'

import {useDispatch} from "react-redux"
import   authService   from '../../services/appwrite/auth';
import {logout} from "../../store/authSlice"


const LogoutBtn = () => {

    
  const dispatch = useDispatch();

  const logoutHandler = () => {

         authService.logout().then(()=>{dispatch(logout())
        
        }).catch((e)=>(
            console.log("LogoutBtn::logoutHandler::error", e) 

        )) //add .catch here
  }

  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
