import React, { useState } from 'react'
import _ from 'lodash'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export default function DragAndDropDnD() {

    const [state, setState] = useState({
        toDo: {
            id: "toDo",
            items: [
                { id: '1', taskName: 'Task 1' },
                { id: '2', taskName: 'Task 2' },
                { id: '3', taskName: 'Task 3' },
            ]
        },
        inProgress: {
            id: "inProgress",
            items: [
                { id: '4', taskName: 'Task 4' },
                { id: '5', taskName: 'Task 5' },
                { id: '6', taskName: 'Task 6' },
            ]
        },
        done: {
            id: "done",
            items: [
                { id: '7', taskName: 'Task 7' },
                { id: '8', taskName: 'Task 8' },
                { id: '9', taskName: 'Task 9' },
            ]
        }
    })
    const handleDragEnd = (result) => {
        let { destination, source } = result
        if (!destination) {
            // Đôi lúc gặp drop bị lỗi 
            return ;
        }
        // Nếu nó drag drop tại vị trí hiện tại-> ko thay đổi vị trí
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            // Đôi lúc gặp drop bị lỗi 
            return;
        }

        // Tiếp tục xử lý quy trình kéo thả bình thường
        // Tạo ra 1 task drag(sao lưu) từ thẻ dc kéo
        let itemCopy = state[source.droppableId].items[source.index]
        // console.log("~ itemCopy", itemCopy)

        // Droppable bắt đầu kéo => thằng cần xóa item
        let dropSource = state[source.droppableId].items.filter(item => item.id!==itemCopy.id)
        // console.log("~ dropSource", dropSource)
        state[source.droppableId].items=dropSource
        
        // Droppable thả vào, nơi cần thêm item vào
        let dropDestination = state[destination.droppableId].items
        // Chèn phần tử vào, dùng splice, ở đây ko dùng để xóa mà dùng dể chèn phẩn tử
        // Bản chất splice vậy nó vẫn ăn do arr chung hệ tham chiếu
        dropDestination.splice(destination.index,0,itemCopy)
        // console.log("~ dropDestination", dropDestination)
        // Xử lý ngoài khiến code gọn hơn trong hàm setState
        setState(state)
        

        // console.log("~ result", result)
        // console.log("~ source", source)
        // console.log("~ destination", destination)
        
    }


    return (
        <div className="container">
            <h3 className="text-center display-4">Demo DragAndDrop DND</h3>

            {/* Tuy nhiên ta muốn nội dung được kéo thả */}
            <DragDropContext onDragEnd={handleDragEnd}>
                {/* trong hàm này map bên trong nhận vào  object là state, tham số thứ 2 là từng thuộc tính (items)  */}
                <div className="row">
                    {_.map(state, (statusTask, index) => {
                        return <Droppable key={index} droppableId={statusTask.id}>
                            {/* Trong đây thay vì nhận nội dung nó sẽ nhận hàm */}
                            {(provided) => {
                                // Muốn drag drop thằng nào thì để vô đây
                                return <div className="col-4" >
                                    <div className="bg-dark p-5" key={index} ref={provided.innerRef} {...provided.droppableProps}>
                                    {/* Vì statustask là arr sẵn rồi nên ko cần dùng lodash */}
                                    <h3 className="text-white">{statusTask.id}</h3>
                                    {statusTask.items.map((item, index) => {
                                        // Muốn kéo thả phải để trong Draggable
                                        // index sẽ xác định ví trí trước khi thay đổi, draggableId sẽ trả ra sau khi kéo xong
                                        return <Draggable key={item.id} index={index} draggableId={item.id}>
                                            {/* Bắt buộc trong đây phải gọi hàm chứ ko phải component trực tiếp */}
                                            {(provided) => {
                                                return <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="mt-2 p-2 bg-white text-center">
                                                    {item.taskName}
                                                </div>
                                            }}
                                            
                                        </Draggable>
                                    })}
                                    </div>
                                </div>
                            }}



                        </Droppable>
                    })}
                </div>

            </DragDropContext>
        </div>
    )
}
