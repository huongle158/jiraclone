import React, { Component } from 'react'
import Axios from "axios"
import style from "./Todolist.css"

export default class componentName extends Component {

    // Hàm sẽ tự động thực thi ngay sau khi nội dung component dc render
    componentDidMount() {
        this.getTaskList()
    }
    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    }
    renderTaskToDo = () => {
        return this.state.taskList.filter(i => !i.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => { this.delTask(item.taskName) }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type="button" onClick={() => { this.checkTask(item.taskName) }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    renderTaskToDoDone = () => {
        return this.state.taskList.filter(i => i.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    {/* Thêm type bằng button để phân biệt button submit của form */}
                    <button className="remove" type="button" onClick={() => {
                        this.delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" onClick={() => { this.rejectTask(item.taskName) }} className="complete">
                        <i className="far fa-check-undo" />
                        <i className="fa fa-undo"></i>
                    </button>
                </div>
            </li>
        })
    }
    // Hàm xử lý reject/undo task
    rejectTask = (taskname) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskname}`,
            method: 'PUT'
        })
        promise
            .then((response) => {
                console.log(response.data)
                this.getTaskList()
            })
            .catch(errors => {
                console.log(errors.response.data)
            })

    }
    // Hàm xử lý hoàn thành tasks vs PUT
    checkTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise
            .then((response) => {
                console.log(response.data)
                this.getTaskList()
            })
            .catch(errors => {
                console.log(errors.response.data)
            })

    }

    // Hàm xử lý xóa tasks
    delTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise
            .then((result) => {
                console.log(result.data)
                // Gọi lại thủ công sau mỗi lần render để nó load lại dữ liệu lên
                this.getTaskList()
            })
            .catch((errors) => {
                console.log(errors.response.data)

            })
    }
    getTaskList = () => {
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
            this.setState({
                taskList: result.data
            })
        });
        // Nếu promise thất bạ i
        promise.catch(err => {
            console.log('Thất bai')
            console.log(err.response.data)
        })
    }
    handleChange = (e) => {
        let { value, name } = e.target;
        let newValues = { ...this.state.values };
        newValues = { ...newValues, [name]: value }
        let newErrors = { ...this.state.errors }
        let regexString = /^[a-z A-Z]+$/;
        // Lấy test, nếu ko hợp lệ
        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + 'invalid !';
            return;
        } else {
            newErrors[name] = ''
        }
        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        })
    }
    addTask = (e) => {
        e.preventDefault(); //Dừng sự kiện submit form 
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: this.state.values.taskName }
        })
        // Xử lý thành công
        promise.then(result => {
            // console.log(result.data)
            this.getTaskList()
        })
        promise.catch(errors => {
            alert(errors.response.data)
        })
    }
    render() {
        return (
            <form onSubmit={this.addTask}>
                <div className="card">
                    <div className="card__header">
                        <img src={require("./bg.png")} />
                    </div>
                    {/* <h2>hello!</h2> */}
                    <div className="card__body">
                        <div className="card__content">
                            <div className="form-group">
                                <div className="card__title">
                                    <h2>My Tasks</h2>
                                    <p>September 9,2020</p>
                                </div>
                                <div className="card__add">
                                    <input name="taskName" onChange={this.handleChange} id="newTask" type="text" placeholder="Enter an activity..." />
                                    <button id="addItem" onClick={this.addTask}>
                                        <i className="fa fa-plus" />
                                    </button>
                                </div>
                                <span className="text text-danger">{this.state.errors.taskName}</span>
                            </div>



                            <div className="card__todo form-group">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.renderTaskToDo()}

                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.renderTaskToDoDone()}

                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        )
    }
}
