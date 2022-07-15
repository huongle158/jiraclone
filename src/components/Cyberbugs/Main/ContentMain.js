import React, { Fragment } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from '../../../util/constants/Cyberbugs/TaskConstants'

export default function ContentMain(props) {
  const { projectDetail } = props;
  const dispatch = useDispatch()

  const handleDragEnd = (result) => {
    console.log("~ result", result)
    let { destination, source, draggableId } = result
    // Lấy ra chuỗi sau mỗi lần draggable
    let {projectId,taskId}=JSON.parse(result.draggableId)
    // console.log("~ taskId", taskId)
    // console.log("~ projectId", projectId)
    // Nếu kéo ra vùng đó null ko hợp lệ
    if (!destination) {
      return;
    }
    // Nếu kéo đến trùng vị trí cũ
    if (destination.index === source.index && destination.droppableId===source.droppableId) {
      return;
    }
    
    // Gọi api cập nhật lại status
    dispatch({
      type: UPDATE_STATUS_TASK_SAGA,
      taskStatusUpdate: {
        "taskId": taskId,
        "statusId": destination.droppableId,
        // Bổ sung thêm để đủ nghiệp vụ đã thiết kế
        "projectId": projectId
      }

    })





  }

  const renderCardTaskList = () => {
    // Context sẽ có sự kiện onDragEnd sau khi xử lý drag xong control 
    return <DragDropContext onDragEnd={handleDragEnd}>
      {
        projectDetail.lstTask?.map((taskListDetail, index) => {
          return <Droppable key={index} droppableId={taskListDetail.statusId}>
            {(provided) => {
              return <div
                className="card pb-2" style={{ width: "17rem", height: "auto" }}>
                <div className="card-header">{taskListDetail.statusName}</div>
                <ul
                  // Bổ sung thuộc tính để kéo thả được
                  ref={provided.innerRef} {...provided.droppableProps}
                  key={index} 
                  className="list-group list-group-flush">
                  {taskListDetail.lstTaskDeTail.map((task, index) => {
                    // Key này phải là chuỗi nếu ko .toString() nếu ko nó sẽ cảnh báo lỗi
                    return <Draggable key={task.taskId.toString()} index={index} draggableId={JSON.stringify({
                      projectId: task.projectId,
                      taskId: task.taskId
                    })}>
                      {(provided) => {
                        return <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={index}
                          className="list-group-item pb-2"
                          data-toggle="modal"
                          data-target="#infoModal"
                           onClick={() => {
                            dispatch({
                              type: GET_TASK_DETAIL_SAGA,
                              taskId: task.taskId
                            })
                          }}
                        >
                          <p className="font-weight-bold">
                            {task.taskName}
                          </p>
                          <div className="block" style={{ display: "flex" }}>
                            <div className="block-left">
                              <p className="text-danger">{task.priorityTask.priority}</p>
                              {/* <i className="fa fa-bookmark" />
                          <i className="fa fa-arrow-up" /> */}
                            </div>
                            <div className="block-right">
                              <div
                                className="avatar-group"
                                style={{ display: "flex" }}
                              >
                                {task.assigness?.map((mem, index) => {
                                  return <div key={index} className="avatar">
                                    <img
                                      src={mem.avatar} alt={mem.avatar}
                                    />
                                  </div>
                                })}

                              </div>
                            </div>
                          </div>
                        </li>
                      }}
                    </Draggable>
                   
                  })}
                {provided.placeholder}
                </ul>
              </div>
            }}
          </Droppable>
        })
      }
    </DragDropContext>
  }

  return (
    <Fragment>
      <div className="content" style={{ display: "flex" }}>
        {renderCardTaskList()}
      </div>
    </Fragment>
  );
}
