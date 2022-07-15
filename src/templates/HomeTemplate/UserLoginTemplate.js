import React, { Fragment, useState, useEffect } from 'react';
import { Outlet, Route, useNavigate, useParams } from 'react-router-dom';
import { Button, Layout } from 'antd';
import LoginCyberBugs from '../../pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';


const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
    // Nhận biến props truyền vào từ routing dể dễ chuyển hướng trang 

    const [{width,height}, setSize] = useState({
        width: Math.round(window.innerWidth),
        height:Math.round( window.innerHeight)
    })
    // Viết hàm useEffect thay thế cho lifecycle chạy đầy tiên componentDidMount sau khi render lại
    useEffect(() => {
        window.onresize = () => {
            setSize({
                // Tính lại width khi resize
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight)
            })
        }
    }
    )

    {/* Children ở đây là form Login được bao bởi UserLoginTemplate*/ }
    const { children, ...restRoute } = props;
    const navigate = useNavigate()
 
    
    return <>
        <Layout>
            <Sider width={width / 2} style={{ height: height, backgroundImage: `url(https://picsum.photos/${Math.round(width / 2)}/${height})`, backgroundSize: '100%' }}></Sider>
            {/* Children tức component này phải làm sao để n  hận được props truyền vào */}
            <Content>
                {/* {React.Children.map(children, child => {
                    React.cloneElement(child,{navigate})
                })} */}
                {/* {React.cloneElement(children,[navigate,{...restRoute}])} */}
                {/* <LoginCyberBugs {...restRoute}/> */}
                <LoginCyberBugs navigate={navigate} />
            </Content>

        
        </Layout>

    </>
}