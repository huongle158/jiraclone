import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Login from '../Login/Login'

export default function Profile(props) {
    if (localStorage.getItem('userLogin')) {
    return <div>Profile</div>
    }
    else {
        alert("Vui lòng đăng nhập để vào trang này")
        return <Navigate to="/login" />
        
    }
    
   
 
}
