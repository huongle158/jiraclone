import React, { Fragment, useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarsOutlined,
    SearchOutlined,
    PlusOutlined
} from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux'
import './LiTi.css'
import FormCreateTask from '../Forms/FormCreateTask/FormCreateTask';
import { GET_ALL_PROJECT_SAGA } from '../../util/constants/Cyberbugs/ProjectConstatnts';

const { Header, Sider, Content } = Layout;

export default function SidebarCyberbugs() {


    const dispatch = useDispatch();


    const [state, setState] = useState({
        collapsed: false,
    })
    const togle = () => {
        setState({
            collapsed: !state.collapsed,
        })
    }
    useEffect(() => {
        
    }, [])

    return (
        <Fragment>
            {/* Sider Bar  */}
            <Sider trigger={null} collapsible collapsed={state.collapsed} style={{ height: '100%' }}>
                <div className="text-right pr-2" onClick={togle}  ><BarsOutlined style={{ cursor: 'pointer', color: '#fff', fontSize: 25 }} /></div>

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item onClick={() => {
                        dispatch({
                            type: 'OPEN_FORM_CREATE_TASK',
                            Component: <FormCreateTask />,
                            title: 'Create task'
                        })
                    }} key="1" icon={<PlusOutlined style={{ fontSize: 20 }} />}>
                        <span className="mb-2">Create task</span>
                    </Menu.Item>


                    <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
                        Search
                    </Menu.Item>

                </Menu>
            </Sider>

        </Fragment>
    )
}
