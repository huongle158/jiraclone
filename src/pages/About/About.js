import React from 'react'
import { Outlet } from 'react-router-dom'

export default function About(props) {
  const {headElement,lastElement} = props
  return (
    <div>
      {headElement}
      About
      {lastElement}
      <Outlet />
    </div>
  )
}
