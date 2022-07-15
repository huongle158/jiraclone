import React, { Fragment, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Select } from "antd";
import { GET_ALL_STATUS_SAGA } from "../../../util/constants/Cyberbugs/StatusConstants";
import { GET_ALL_PRIORITY_SAGA } from '../../../util/constants/Cyberbugs/PriorityConstant';
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA } from '../../../util/constants/Cyberbugs/TaskConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../util/constants/Cyberbugs/TaskTypeConstants';
import { Editor } from "@tinymce/tinymce-react";
import { useState } from 'react';

const { Option } = Select;
const children = [];


export default function ModalCyberBugs(props) {

    const { taskDetailModel } = useSelector(state => state.TaskReducer)
    const { arrStatus } = useSelector(state => state.StatusReducer)
    const { arrPriority } = useSelector((state) => state.PriorityReducer);
    const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
    const { projectDetail } = useSelector(state => state.ProjectReducer)
    console.log("~ taskDetailModel", taskDetailModel)

    const [visibleEditor, setVisibleEditor] = useState(true)
    // Giá trị lưu trữ nội dung trên description giá trị ng dùng nhập. Giá trị ban đầu từ taskdetailModel
    const [historyContent, setHistoryContent] = useState(taskDetailModel.description)
    const [content, setContent] = useState(taskDetailModel.description)

    const editorRef = useRef(null);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: GET_ALL_STATUS_SAGA,
            keyWord: "",
        });

        dispatch({
            type: GET_ALL_PRIORITY_SAGA,
        });

        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
    }, [])


    const handleChange = (e) => {

        const { name, value } = e.target;

        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODAL,
            name,
            value            
        })

        // dispatch({
        //     type: CHANGE_TASK_MODAL,
        //     // ES6: name cũng như name:name
        //     name,
        //     value
        // })

    }


    const renderDescription = () => {
        const jsxDescription = ReactHtmlParser(taskDetailModel.description)
        return (
            <div>
                {visibleEditor ? <div>
                    <Editor
                        name="description"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={taskDetailModel.description}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | " +
                                "bold italic backcolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={(content, editor) => {
                            // Mỗi lần nhập liệu setContent để nó gửi lên reducer
                            setContent(content);
                        }}
                    />
                    <button className="btn btn-primary m-2" onClick={() => {
                        // close sẽ dispatch giá trị Lên
                        dispatch({
                            type:HANDLE_CHANGE_POST_API_SAGA,
                            actionType: CHANGE_TASK_MODAL,
                            name: 'description',
                            value: content
                        })
                        // dispatch({
                        //     type: CHANGE_TASK_MODAL,
                        //     name: 'description',
                        //     value: content
                        // })
                        
                        setVisibleEditor(false)
                    }}>Save</button>
                    <button className="btn btn-primary m-2" onClick={() => {
                       
                        // Cũng dispatch nh history cũ ko chinh sửa
                        dispatch({
                            type: HANDLE_CHANGE_POST_API_SAGA,
                            actionType: CHANGE_TASK_MODAL,
                            name: 'description',
                            value: historyContent
                        })
                        // dispatch({
                        //     type: CHANGE_TASK_MODAL,
                        //     name: 'description',
                        //     value: historyContent
                        // })
                        // Tắt cái Editor đi
                        setVisibleEditor(false)
                    }}>Close</button>
                </div>
                    : <div onClick={() => {
                         // TRước hết mình phải update giá trị của nó chứ ko nó mãi ko đổi là giá trị hiện tại chưa chỉnh sửa
                        setHistoryContent(taskDetailModel.description)
                        // true sẽ set thành false và ngược lại
                        setVisibleEditor(!visibleEditor)
                    }}>
                        <i>{jsxDescription}</i>
                    </div>}


            </div>

        )
    }

    const renderTimeTracking = () => {

        const { timeTrackingSpent, timeTrackingRemaining, originalEstimate } = taskDetailModel
        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining)
        const percent = Math.round(Number(timeTrackingSpent) / max * 100)

        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <i className="fa fa-clock" />
                    <div style={{ width: '100%' }}>
                        <div className="progress">
                            {/* style dộ dài phần trăm bằng spend/max *100 */}
                            <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                            <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                        </div>
                    </div>
                </div>
                <div className="row" >
                    <div className="col-6">
                        <input name="timeTrackingSpent" className="form-control" onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <input name="timeTrackingRemaining" className="form-control" onChange={handleChange} />
                    </div>
                </div>



            </div>
        )
    }



    return (
        <Fragment>
            {/* Info Modal */}
            <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                <div className="modal-dialog modal-info">
                    <div className="modal-content pr-5">
                        <div className="modal-header">
                            <div className="task-title">
                                <i className="fa fa-bookmark" />
                                <select name="typeId" value={taskDetailModel.typeId} onChange={handleChange}>
                                    {arrTaskType.map((tasktype, index) => {
                                        return <option key={index} value={tasktype.id}>{tasktype.taskType}</option>
                                    })}
                                </select>

                                <span>{taskDetailModel.taskName}</span>
                            </div>
                            <div style={{ display: 'flex' }} className="task-click">
                                <div>
                                    <i className="fab fa-telegram-plane" />
                                    <span style={{ paddingRight: 20 }}>Give feedback</span>
                                </div>
                                <div>
                                    <i className="fa fa-link" />
                                    <span style={{ paddingRight: 20 }}>Copy link</span>
                                </div>
                                <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="issue">This is an issue of type: Task.</div>
                                        <div className="description">
                                            <p>Description</p>
                                            {renderDescription()}


                                        </div>
                                        <div className="comment">
                                            <h6>Comment</h6>
                                            <div className="block-comment" style={{ display: 'flex' }}>
                                                <div className="avatar">
                                                    <img src={require('../../../assets/img/download (1).jfif')} />
                                                </div>
                                                <div className="input-comment">
                                                    <input type="text" placeholder="Add a comment ..." />
                                                    <div>
                                                        <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                        <span>press
                                                            <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                            to comment</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="lastest-comment">
                                                <div className="comment-item">
                                                    <div className="display-comment" style={{ display: 'flex' }}>
                                                        <div className="avatar">
                                                            <img src={require('../../../assets/img/download (1).jfif')} />
                                                        </div>
                                                        <div>
                                                            <div style={{ marginBottom: 5 }}>
                                                                Lord Gaben <span>a month ago</span>
                                                            </div>
                                                            <div style={{ marginBottom: 5 }}>
                                                                Lorem ipsum dolor sit amet, consectetur
                                                                adipisicing elit. Repellendus tempora ex
                                                                voluptatum saepe ab officiis alias totam ad
                                                                accusamus molestiae?
                                                            </div>
                                                            <div>
                                                                <span style={{ color: '#929398' }}>Edit</span>
                                                                •
                                                                <span style={{ color: '#929398' }}>Delete</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="status">
                                            <h6>STATUS</h6>
                                            <select name="statusId" className="custom-select" value={taskDetailModel.statusId} onChange={(e) => {

                                                // Xài hàm handleChange mà mình tự định nghĩa
                                                handleChange(e)



                                                // Mỗi lần edit dispatch lên cập nhật lại
                                                //     const action ={
                                                //         type: UPDATE_STATUS_TASK_SAGA,
                                                //         taskStatusUpdate: {
                                                //             taskId: taskDetailModel.taskId,
                                                //             statusId: e.target.value,
                                                //             projectId: taskDetailModel.projectId
                                                //         }
                                                //     }
                                                //    dispatch(action)

                                            }}>
                                                {arrStatus.map((status, index) => {
                                                    return <option key={index} value={status.statusId}>{status.statusName}</option>
                                                })}

                                            </select>
                                        </div>
                                        <div className="assignees">
                                            <h6>ASSIGNEES</h6>
                                            <div className="row">
                                                {taskDetailModel.assigness.map((user, index) => {
                                                    console.log("~ user", user)
                                                    return <div className="col-6 mt-2 mb-2">
                                                        <div key={index} style={{ display: 'flex', marginRight: '0' }} className="item">
                                                            <div className="avatar">
                                                                <img src={user.avatar} />
                                                            </div>
                                                            <div className="name mt-1">
                                                                {user.name}
                                                                {/* Nút x xóa assignees members */}
                                                                <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                                                                    
                                                                    dispatch({
                                                                        type: HANDLE_CHANGE_POST_API_SAGA,
                                                                        actionType: REMOVE_USER_ASSIGN,
                                                                        userId: user.id                                                                    
                                                                    })

                                                                    // dispatch({
                                                                    //     type: REMOVE_USER_ASSIGN,
                                                                    //     userId:user.id
                                                                    // })
                                                                }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}

                                                <div className="col-6 mt-2 mb-2">
                                                    <Select optionFilterProp='label' value="+ Add more" options={projectDetail.members?.filter(mem => {
                                                        let index = taskDetailModel.assigness?.findIndex(us => us.id === mem.userId)
                                                        // Tức là xuất hiện trùng nhau -> trả false ko xuất hiện
                                                        if (index !== -1) {
                                                            return false;
                                                        }
                                                        return true;
                                                    })?.map((mem, index) => {
                                                        return { value: mem.userId, label: mem.name }
                                                    })}
                                                        style={{ width: '100%' }} name="lstUser" className="form-control" onSelect={(value) => {
                                                            if (value == 0) {
                                                                return;
                                                            }
                                                            // Lấy ra user được chọn
                                                            let userSelected = projectDetail.members.find(mem => mem.userId == value);
                                                            // Vì dua lên task Reducer cần trường id chứ ko phải userId
                                                            userSelected = { ...userSelected, id: userSelected.userId }
                                                            // Add UserAssign
                                                            dispatch({
                                                                type: HANDLE_CHANGE_POST_API_SAGA,
                                                                actionType: CHANGE_ASSIGNESS,
                                                                userSelected
                                                            })
                                                            // dispatch({
                                                            //     type: CHANGE_ASSIGNESS,
                                                            //     userSelected: userSelect
                                                            // })

                                                            console.log("~ userSelect", userSelected)

                                                        }}>
                                                        {/* Cho nó option mặc định để khắc phục sự cố ko chọn dc cái cuối  */}
                                                        {/* <option value="0" selected>Select User</option> */}

                                                        {/* Dùng hàm filter trả ra những giá trị tru (giá trị thỏa return mới dc xài) */}


                                                    </Select>

                                                </div>
                                            </div>
                                        </div>


                                        <div className="priority mt-2" style={{ marginBottom: 20 }}>
                                            <h6>PRIORITY</h6>
                                            <select name="priorityId" value={taskDetailModel.priorityId} className="form-control" onChange={(e) => {
                                                handleChange(e)
                                            }}>

                                                {arrPriority?.map((item, index) => {
                                                    return <option key={index} value={item.priorityId}>{item.priority}</option>

                                                })}

                                            </select>
                                        </div>
                                        <div className="estimate">
                                            <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                            <input name="originalEstimate" onChange={(e) => { handleChange(e) }} value={taskDetailModel.originalEstimate} type="text" className="estimate-hours" />
                                        </div>
                                        <div className="time-tracking">
                                            <h6>TIME TRACKING</h6>
                                            {renderTimeTracking()}

                                        </div>
                                        <div style={{ color: '#929398' }}>Create at a month ago</div>
                                        <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
