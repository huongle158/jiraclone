import React from 'react'
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { USER_SIGNIN_API } from '../../../redux/constants/Cyberbugs/Cyberbugs';
import { signinCyberbugAction } from '../../../redux/actions/CyberBugsAction';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

function LoginCyberBugs(props) {
    const {
        values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
    return (
        <>
        <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }}>
            <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: window.innerHeight }}>
                <h3 className="text-center">Login Cyberbugs</h3>
                <div className="d-flex flex-column mt-3">
                    <Input onChange={handleChange} name="email" value={values.email} type="email" size="large" placeholder="email" prefix={<UserOutlined />} />
                </div>
                {/* In lỗi */}
                <div className="text-danger">
                    {errors.email}
                </div>
                <div className="d-flex flex-column mt-3">
                    <Input onChange={handleChange} size="large" name="password" type="password" placeholder="password" prefix={<LockOutlined />} />
                </div>
                {/* In lỗi */}
                <div className="text-danger">
                    {errors.password}
                </div>
                <div>{errors.password}</div>
                <Button htmlType='submit' type="primary" size="large" style={{ width: '30%', backgroundColor: 'rgb(102,117,223)' }} className="mt-3 text-white">Login</Button>
                <div className="social mt-3 d-flex">
                    <Button style={{ backgroundColor: 'rgb(59,89,152)' }} shape="circle" size="large" icon={<FacebookOutlined />}></Button>
                    <Button className="ml-3" type="primary" shape="circle" size="large" icon={<TwitterOutlined />}></Button>
                </div>
            </div>
            </form>
            <Outlet />
        </>
    )
}
const LoginCyberBugsWithFormik = withFormik({
    
    // Biến props từ component của mình nó sẽ lấy ra thành values
    mapPropsToValues: (props) => {
        console.log("form props: ", props);
        return {
            email: '',
            password: '',
            navigate: props.navigate

        }
    },
    // Bóc tách email, password từ values
    handleSubmit: ({ email, password, navigate}, { props, setSubmitting }) => {
           // let action = {
        //     type: USER_SIGNIN_API,
        //     userLogin: {
        //         email: values.email,
        //         password: values.password
        //     }
        // }
        
        // Chặn sự kiện submit
        // setSubmitting(true)
        
        props.dispatch(signinCyberbugAction(email, password,navigate))
        
        
    },
    validationSchema: Yup.object().shape({ // Validate form field
        email: Yup.string().required("Email is required").email('email is invalid'),
        password: Yup.string().min(6, "password must have min 6 characters").max(32, "password have max 32 characters")

    }),
    // Cái này ko xài dc mà chỉ để dùng phân biệt controlFormik cho mọi trường developer
    displayName: 'Login CyberBugs',

})(LoginCyberBugs);

// Một control mới sinh ra, 1 khái niệm mới cỦA HOC, nhận vào component của mình và trả ra component của mình có chứa những khái niện, thuộc tính của formik
export default connect()(LoginCyberBugsWithFormik)