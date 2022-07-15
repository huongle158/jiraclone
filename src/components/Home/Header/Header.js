import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Header.css'
export default function Header() {
  return (

    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">Cyberlearn</NavLink>
      <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <NavLink className={({ isActive }) => isActive ? "activeNavItem nav-link" : "nav-link"} style={({ isActive }) => ({
              fontWeight: 'bold',//thuộc tính apply cả
              fontSize: isActive ? '16px' : '14px'


            })} to="/home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? "activeNavItem nav-link" : "nav-link"} exact='false' to="about">About</NavLink>
          </li>
          <li className="nav-item dropdown">
            <NavLink className={({ isActive }) => isActive ? "activeNavItem nav-link" : "nav-link"} to="contact">Contact</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? "activeNavItem nav-link" : "nav-link"} to="login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? "activeNavItem nav-link" : "nav-link"} to="profile">Profile</NavLink>
          </li>
          {/* DemoHOCModal */}
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? "activeNavItem nav-link" : "nav-link"} to="/demohocmodal">Demo HOC</NavLink>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bài tập</a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <NavLink className={({ isActive }) => isActive ? "dropdown-item" : "dropdown-item"} to="todolist">ToDoRCC</NavLink>
              <NavLink className={({ isActive }) => isActive ? "dropdown-item" : "dropdown-item"} to="todolistrfc">ToDoListRFC</NavLink>
              <NavLink className={({ isActive }) => isActive ? "dropdown-item" : "dropdown-item"} to="todolistredux">ToDoListRedux</NavLink>
              <NavLink className={({ isActive }) => isActive ? "dropdown-item" : "dropdown-item"} to="todolistsaga">ToDoListSaga</NavLink>
             
            </div>
          </li>

        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
      <Outlet />
    </nav>


  )
}
