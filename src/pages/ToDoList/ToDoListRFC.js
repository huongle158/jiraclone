import React, {useState,useEffect} from 'react'
import style from "./Todolist.css"
import Axios from "axios"

export default function ToDoListRFC(props) {


  let [state, setState] = useState({
    taskList: [],
    values: {
      taskName: ''
    },
    errors: {
      taskName: ''
    }
  })
 
  const handleChange = (e) => {
    e.preventDefault();
    let { value, name } = e.target;
    let newValues = { ...state.values };
    newValues = { ...newValues, [name]: value }
    let newErrors = { ...state.errors }
    let regexString = /^[a-z A-Z]+$/;
    // Lấy test, nếu ko hợp lệ
    if (!regexString.test(value) || value.trim() === '') {
      newErrors[name] = name + 'invalid !';
      return;
    } else {
      newErrors[name] = ''
    }
   setState({
      ...state,
      values: newValues,
      errors: newErrors
    })
  }
   const renderTaskToDo = () => {
    return state.taskList.filter(i => !i.status).map((item, index) => {
      return <li key={index}>
        <span>{item.taskName}</span>
        <div className="buttons">
          <button className="remove" type="button" onClick={() => { delTask(item.taskName) }}>
            <i className="fa fa-trash-alt" />
          </button>
          <button className="complete" type="button" onClick={() => { checkTask(item.taskName) }}>
            <i className="far fa-check-circle" />
            <i className="fas fa-check-circle" />
          </button>
        </div>
      </li>
    })
  }
  const renderTaskToDoDone = () => {
    return state.taskList.filter(i => i.status).map((item, index) => {
      return <li key={index}>
        <span>{item.taskName}</span>
        <div className="buttons">
          {/* Thêm type bằng button để phân biệt button submit của form */}
          <button className="remove" type="button" onClick={() => {
            delTask(item.taskName)
          }}>
            <i className="fa fa-trash-alt" />
          </button>
          <button type="button" onClick={() => { rejectTask(item.taskName) }} className="complete">
            <i className="far fa-check-undo" />
            <i className="fa fa-undo"></i>
          </button>
        </div>
      </li>
    })
  }
  // Hàm xử lý reject/undo task
  const rejectTask = (taskname) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskname}`,
      method: 'PUT'
    })
    promise
      .then((response) => {
        console.log(response.data)
        getTaskList()
      })
      .catch(errors => {
        console.log(errors.response.data)
      })

  }
  // Hàm xử lý hoàn thành tasks vs PUT
  const checkTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: 'PUT'
    })
    promise
      .then((response) => {
        console.log(response.data)
        getTaskList()
      })
      .catch(errors => {
        console.log(errors.response.data)
      })

  }


  // Hàm xử lý xóa tasks
  const delTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: 'DELETE'
    })
    promise
      .then((result) => {
        console.log(result.data)
        // Gọi lại thủ công sau mỗi lần render để nó load lại dữ liệu lên
        getTaskList()
      })
      .catch((errors) => {
        console.log(errors.response.data)

      })
  }
  const getTaskList = () => {
    let promise = Axios({
      // Đường dẫn đi tới backend
      url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
      method: 'GET'
    })
    // Nếu promise thành công
    promise.then(result => {
      console.log(result)
      console.log('thành công')
      // Nếu gọi api kết quả thành công => set lại state của component
      setState({
        ...state,
        taskList: result.data
      })
    });
    // Nếu promise thất bạ i
    promise.catch(err => {
      console.log('Thất bai')
      console.log(err.response.data)
    })
  }
  // LẤY API DỮ LIỆU DATA VỀ , mặc định nó sẽ chạy khi giao diện render xong
  useEffect(() => {
    getTaskList()
  }, [])
  const addTask = (e) => {
    e.preventDefault(); //Dừng sự kiện submit form 
    let promise = Axios({
      url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
      method: 'POST',
      data: { taskName: state.values.taskName }
    })
    // Xử lý thành công
    promise.then(result => {
      // console.log(result.data)
      getTaskList()
    })
    promise.catch(errors => {
      alert(errors.response.data)
    })
  }



  return (
    <div className="card">
      <div className="card__header">
        <img src={require("./bg.png")} />
      </div>
      {/* <h2>hello!</h2> */}
      <form className="card__body" onSubmit={addTask}>
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <p>September 9,2020</p>
          </div>
          <div className="card__add">
            <input name="taskName" id="newTask" type="text" placeholder="Enter an activity..." onChange={handleChange} />
            <button type="submit" id="addItem" onClick={addTask} >
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
            {renderTaskToDo()}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
            {renderTaskToDoDone()}
            </ul>
          </div>
        </div>
      </form>
    </div>
  )
}
