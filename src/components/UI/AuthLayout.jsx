import React from 'react'
import {useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected  ({children, authentication=true})   {

    const [loading , setLoading] = useState(true)
    const navigate = useNavigate();
    const authStatus = useSelector(state=>state.auth.status)

    useEffect(()=>{ 

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoading(false)

    },[authStatus, navigate, authentication])

  return   loading ? <h3>Loading</h3>:  children

}
 
