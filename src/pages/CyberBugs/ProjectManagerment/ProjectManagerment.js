import React, { useState, useEffect, useRef } from 'react'
import ReactHtmlParser from 'react-html-parser';
import { EditOutlined, DeleteOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar, Image, Popover, message, Popconfirm, Button, Space, Table, Tag, Divider, AutoComplete } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import FormEditProject from '../../../components/Forms/FormEditProject/FormEditProject';
import { NavLink } from 'react-router-dom';



export default function ProjectManagerment(props) {

    // DÙng useDispatch để gọi action
    const dispatch = useDispatch();
    // Kết nối với reducer
    const { userSearch } = useSelector(state => state.UserLoginCyberBugsReducer)

    // Quản lý state quản lý dữ liệu khi serach
    const [value, setValue] = useState('')

    // Tạo hàm dể xử lý debounceSearch
    const searchRef = useRef(null)

    // Lấy dữ liệu từ reducer về component
    const projectList = useSelector(state => state.ProjectCyberBugsReducer.projectList)

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null
    });


    useEffect(() => {
        // Dispatch lên saga để kích hoạt
        dispatch({
            type: 'GET_LIST_PROJECT_SAGA'
        })
    }, [])

    const handleChange = (pagination, filters, sorter) => {
        // console.log('Various parameters', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter
        })
    };

    const clearFilters = () => {
        setState({
            filteredInfo: null,
        });
    };

    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null
        })
    };

    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            }

        });
    };

    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                // item2 đứng sau, nếu nó nhỏ hơn sẽ hoán vị
                return item2.id - item1.id
            },
            // Chế độ này chỉ có lên và xuống, ko có hủy
            // sortDirections: ['descend'],
        },
        {
            title: 'projectName',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) => {
                return <NavLink to={`/projectdetail/${record.id}`} >{text}</NavLink>
            },
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                // Khi so sánh nó chuyển hết sang mã key hết 
                if (projectName2 > projectName1) {
                    return 1
                } else {
                    return -1
                }
            },
            // sortDirections: ['descend'],

        },
        // {
        //     title: 'description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: (text, record, index) => {
        //         let jsxContent = ReactHtmlParser(text);
        //         return (
        //             <div key={index}>
        //                 {jsxContent}
        //             </div>
        //         )                       
        //     }
        // },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                // Khi so sánh nó chuyển hết sang mã key hết 
                if (categoryName2 > categoryName1) {
                    return 1
                } else {
                    return -1
                }
            },

        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="green">{record.creator?.name}</Tag>

            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();
                // Khi so sánh nó chuyển hết sang mã key hết 
                if (creator2 > creator1) {
                    return 1
                } else {
                    return -1
                }
            },


        },
        {
            // Cột members
            title: 'Members',
            dataIndex: 'members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return (
                            <Popover key={index} placement="top" title={'Members'} content={() => {
                                return (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Avatar</th>
                                                <th>Name</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {record.members?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.userId}</td>
                                                        <td>
                                                            <img src={item.avatar} width='30' height='30' style={{ borderRadius: '50%' }} />
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td> <button onClick={() => {
                                                            dispatch({
                                                                type: 'REMOVE_USER_PROJECT_API',
                                                                userProject: {
                                                                    userId: item.userId,
                                                                    projectId: record.id
                                                                }
                                                            })
                                                        }} className="btn btn-danger" style={{ borderRadius: '50%' }}>
                                                            Xóa
                                                        </button> </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                )
                            }}>
                                <Avatar key={index} src={member.avatar} />
                            </Popover>
                        )
                    })}
                    {/* Chỉ hiện khi dự án quá ba người */}
                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

                    {/* Popover adduser */}
                    <Popover className="ml-1" placement="rightTop" title={'Add user'} content={() => {
                        return <AutoComplete style={{ width: '100%' }} value={value} options={userSearch?.map((user, index) => {
                            return { label: user.name, value: user.userId.toString() }
                        })} onSelect={(valueSelect, option) => {
                            // set giá trị của hộp thoai bằng option.label
                            setValue(option.label)
                            // Gửi giá trị về backend xử lý
                            dispatch({
                                type: 'ADD_USER_PROJECT_API',
                                userProject: {
                                    "projectId": record.id,
                                    "userId": valueSelect
                                }
                            })


                        }} onChange={(text) => {
                            setValue(text)
                        }} onSearch={(value) => {
                            // Nếu bằng null thì nó sẽ chạy vô timeout luôn
                            if (searchRef.current) {

                                clearTimeout(searchRef.current)

                            }

                            // 
                            searchRef.current = setTimeout(() => {

                                dispatch({
                                    type: 'GET_USER_API', keyWord: value
                                })

                            }, 300)


                        }} />
                    }} trigger="click">
                        <Button style={{ borderRadius: '50%' }}>+</Button>
                    </Popover>

                </div>


            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();
                // Khi so sánh nó chuyển hết sang mã key hết 
                if (creator2 > creator1) {
                    return 1
                } else {
                    return -1
                }
            },

        }
        ,
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {
                // console.log("~ record", record)
                return (
                    <Space size="middle">
                        <button className="btn btn-primary mr-2" onClick={() => {
                            const action = {
                                type: 'OPEN_FORM_EDIT_PROJECT',
                                title:'Edit Project',
                                Component: <FormEditProject />,
                            }
                            // dispatch len6 reducer noi dung
                            dispatch(action)
                            // Dispatch dữ liệu dòng hiện tại lên reducer
                            const actionEditProject = {
                                type: 'EDIT_PROJECT',
                                projectEditModel: record
                            }
                            dispatch(actionEditProject)
                        }}>
                            <EditOutlined style={{ fontSize: 17 }} />
                        </button>
                        <Popconfirm
                            title="Are you sure to delete this project?"
                            onConfirm={() => {
                                dispatch({
                                    type: 'DELETE_PROJECT_SAGA',
                                    idProject: record.id
                                })
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <button className="btn btn-danger">
                                <DeleteOutlined style={{ fontSize: 17 }} />
                            </button>
                        </Popconfirm>


                    </Space>)
            }
        }

    ];




    return (

        <div className="container-fluid mt-5">
            <h3 className="">Project Management</h3>
            <Space
                style={{
                    marginBottom: 16,
                }}
            >
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table rowKey={"id"} columns={columns} dataSource={projectList} onChange={handleChange} />
        </div>

    )
}
