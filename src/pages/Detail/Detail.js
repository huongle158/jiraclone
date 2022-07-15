import React from 'react'
import {useParams, useMatch, useLocation} from 'react-router-dom'

export default function Detail({to,children}) {
  let params = useParams();
  const {pathname}=useLocation();
  return (
      <div>
      Giá trị tham số dùng useParams: {params.detailId} 
      <br />
      Giá trị href(dùng useLocation lấy pathname): {pathname}
          
    </div>
  )
}
