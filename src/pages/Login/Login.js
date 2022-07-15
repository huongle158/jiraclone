import React, { Fragment, useState } from 'react';


import { Outlet, Route, Routes, useNavigate} from 'react-router-dom'
import Header from '../../components/Home/Header/Header';
import About from '../About/About';
import Detail from '../Detail/Detail';
import Profile from '../Profile/Profile';

export default function Login(props) {
    // Khai báo navigate để sử dụng nhưng từ bản mới useNavigate(history cũ)
    let navigate = useNavigate()


    const [userLogin, setUserLogin] = useState({
        userName:'', passWord:''
    })
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserLogin({
            ...userLogin,
            [name]:value
        })
    }
    const handleLogin = (event) => {
        event.preventDefault();
        if (userLogin.userName === 'cyber' && userLogin.passWord === '123') {
            // Khi thành công thì chuyển về trang trước đó, hay hàm goBack của history cũ, về trang cũ trc đó liền kề
            // navigate(-1);
            // Chuyển đến 1 trang chỉ định sau khi xử lý (history.push bản cũ), chuyển hướng đến path tương ứng 
            // navigate('/about')
            // Hay sử dụng như kiểu bản history.replace , bản chất giống push nhưng có tí khác biệt, đó là replace: true thay đổi nội dung chứ ko phải chuyển đến địa chỉ
            // navigate('/home', { replace: true })
            navigate(-1)
            // Khi user login thành công, dùng localStorage lưu , vì nó là object phải biến thành chuỗi để lưu vào localStore
            localStorage.setItem('userLogin', JSON.stringify(userLogin))

        }
        else {
            alert("Login fail")
            return;
        }
    }
    
    return (
        <>
         {/* <Header /> */}
      <form className="container" onSubmit={handleLogin}>
          <h3 className="display-4">Login</h3>
          <div className="form-group">
              <p>User Name</p>
              <input name="userName" className="form-control" onChange={handleChange} />
          </div>          
          <div className="form-group">
              <p>Password</p>
              <input name="passWord" className="form-control" onChange={handleChange} />
          </div>          
          <div className="form-group">
              <button className='btn btn-success'>Login</button>
          </div>          
            </form>
            <Routes>
                <Route path='about' element={<About />} />
                <Route path='/detail' element={<Detail />} />
                <Route path='/profile' element={<Profile />} />

            </Routes>
            <Outlet />
      </>

  )
}
