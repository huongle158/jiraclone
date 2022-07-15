import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Home/Header/Header'

export default function Home(props) {
  const userLogin = useSelector(state => state.UserLoginCyberBugsReducer.userLogin)
  
  return (
    <div>
      Đây là trang chủ:
      {userLogin?.email} <br />
      <img src={userLogin?.avatar} />
      <Outlet />
    </div>
  )
}
