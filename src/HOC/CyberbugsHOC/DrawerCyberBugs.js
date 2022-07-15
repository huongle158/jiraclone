import React, { Component } from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;


export default function DrawerCyberBugs(props) {
    const { visible, ComponentContentDrawer, callBackSubmit, title} = useSelector(state => state.drawerReducer);
    const dispatch = useDispatch()



    // Thay vì setState thì hàm dispatch bản chất sẽ là hàm setState gửi lên reducer xử lý 

    const showDrawer = () => {
        dispatch({
            type: 'OPEN_DRAWER'
        })
    };

    const onClose = () => {
        dispatch({
            type: 'CLOSE_DRAWER'
        })
    };

    return (
        <>
            {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                New account
            </Button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {/* Nội dung thay đổi của drawer */}
                {ComponentContentDrawer}
            </Drawer>
        </>
    );

}

