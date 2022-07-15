import React, { useRef, useState } from 'react'
import './DemoDragDrop.css'
import {useSpring,animated} from 'react-spring'

const defaultValue = [
    { id: 1, taskName: 'Task 1' },
    { id: 2, taskName: 'Task 2' },
    { id: 3, taskName: 'Task 3' },
    { id: 4, taskName: 'Task 4' },
    { id: 5, taskName: 'Task 5' },
]

export default function DemoDragDrop() {
    // Nhửng gì thay đổi tren giao diện khai báo tren7 state
    const [taskList, setTaskList] = useState(defaultValue);
    // Lưu trữ task dc kéo
    const tagDrag = useRef({});
    // Lưu trữ vị trí tag lia(thả vào)
    const tagDragEnter= useRef({});

    // Animation
    const [propsSpring, set, stop] = useSpring(() => ({
        from: { bottom: 25 },
        to: { bottom: 0 },
        config: { duration: 250 },
        // Thêm thuộc tính này nó mới chạy lai, mỗi lần setState thì animation mới chạy lại nếu ko nó chỉ chạy 1 lần thôi
        reset: true
    }))



    const handleDragStart = (e,task,index) => {
        // console.log("~ e.target dragstart", e.target)
        // console.log("~ task", task)
        // console.log("~ index", index)
        // Khi nhấc len sẽ đem task đó lưu lại
        // Lưu lại giá trị của task đang drag
        tagDrag.current = task;

    }
   
    const handleDragEnter = (e, tagDragEnter, index) => {
        // console.log("~ e.targetOver", e.target)
        // console.log("~ task", task)
        // console.log("~ index", index)

        // Set để animation chạy lại
        set({bottom:0})
        
        // Lưu lại giá trị của task(vị trí) được kéo qua 
        tagDragEnter.current = {...tagDragEnter};

        // Trước hết là phải sao chép vị trí của mảng, nếu ko 1 lát vị trí sẽ bị sai
        let taskListUpdate = [...taskList];
        // Thì khi mình drag thì có 1 giá trị lưu trữ khi nó drag để  hoán vị với những thằng nó đã đi qua
        // Tuy nhiên để lưu trữ giá khi nó drag lên ko thể state được mà phải dùng useRef vì nếu để useState mỗi lần nó đi qua nó setState lại thì thành mảng mới rồi -> gây rất nhiều lỗi phụ. useRef thì ko bị thay đổi sau mỗi lần cta setState
        // Lấy ra index thằng đang kéo


        let indexDragStart = taskListUpdate.findIndex(task => task.id === tagDrag.current.id)
        // Tiếp theo là vị trí dc thả vô (index thằng dc thả vô)
        let indexDragEnter = taskListUpdate.findIndex(task => task.id === tagDragEnter.id)
        
        // Tạo biến tạm
        let temp = taskListUpdate[indexDragStart];
        // Hoán vị
        taskListUpdate[indexDragStart] = taskListUpdate[indexDragEnter]
        taskListUpdate[indexDragEnter] = temp;
        // Cập nhật lại state
        setTaskList(taskListUpdate)
        


    }
    const handleDragOver = (e, task, index) => {
        // e.stopPropagation();
        // e.preventDefault();

    }

    const handleDragEnd = (e) => {
        // console.log("~ e.targetEndr", e.target)
        // console.log('tagDrag',tagDrag.current)
        tagDrag.current = {}
        // dể nó render lại gaio diện cập nhật css phải setState => set lại taskList bằng chính nó 
        setTaskList([...taskList])
      
    }

    const handleDrop = (e) => {
        console.log("drop", e.target)
    }

    return (
        <div className="container">
            <div 
                onDragOver={handleDragOver}
                className="text-center display-4">
                Task list
            </div>

            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 bg-dark p-5">
                    {taskList.map((task, index) => {

                        let cssDragTag = task.id === tagDrag.current.id ? 'dragTag' : ''
                        // Nếu được chạy qua nó sẽ return về này 
                        if (task.id === tagDragEnter.current.id) {
                            return <animated.div
                                // Thực hiện animation cho nó
                                style={{
                                    position: 'relative',
                                    bottom: propsSpring.bottom.to(numBottom => `${numBottom}px`)
                                }}
                                draggable="true"
                                onDragStart={(e) => { handleDragStart(e, task, index) }}
                                onDragEnd={(e) => { handleDragEnd(e) }}
                                onDragEnter={(e) => { handleDragEnter(e, task, index) }}
                                className={`bg-success text-white m-1 p-3`}>
                                {task.taskName}
                            </animated.div>
                        }

                        return <div key={index}
                            draggable="true"
                            onDragStart={(e) => { handleDragStart(e, task, index) }}
                            onDragEnd={(e)=>{ handleDragEnd(e)}}
                            onDragEnter={(e) => { handleDragEnter(e,task,index)}}
                            className={`bg-success text-white m-1 p-3 ${cssDragTag}`}>
                            {task.taskName}
                        </div>
                    })}
                </div>
                <div className="col-2 bg-primary"
                    onDragOver={handleDragOver}
                    // onDrop={(e)=>{handleDrop(e)}}
                >
                    Vị trí có thể được kéo vào
                </div>
            </div>

        </div>
    )
}
