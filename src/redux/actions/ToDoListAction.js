import Axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConst";



export const getTaskListApi = () => {
  // ko phải trả về object mà trả về funtion
  // Tiền xử lý dữ liệu => xử lý
  return async dispatch => {
    try {
      let { data, status } = await Axios({
        // Đường dẫn đi tới backend
        url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
        method: 'GET'
      })
      if (status === 200) {
        dispatch({
          type: GET_TASK_API,
          taskList: data
        })
      }
    } catch (err) {
      console.log(err.response.data)
    }
    
    //   // Nếu promise thành công
    //   promise.then(result => {
    //   dispatch({
    //     type: GET_TASK_API,
    //     taskList: result.data
    //   })

    // });
    // // Nếu promise thất bạ i
    // promise.catch(err => {
    //   console.log('Thất bai')
    //   console.log(err.response.data)
    // })

  }

}
export const addTaskApi = (taskName) => {
  return async dispatch => {
    // Xử lý trc khi dispatch
    try {
      let {data,status} = await Axios({
        url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
        method: 'POST',
        data: { taskName: taskName },
      })
      // Xử lý thành công
      if (status === 200) {
          dispatch(getTaskListApi())
      }
    } catch (err) {
      console.log(err)
    }

    // promise.then(result => {
    //   // getTaskList()
    //   // Thay vì như vậy. cta chỉ cần
    //   dispatch(getTaskListApi())
    // })
    // promise.catch(errors => {
    //   alert(errors.response.data)
    // })
  }
}
export const deleteTaskApi = (taskName) => {
  // Lưu ý function này là do redux thunk trả ra 
  return dispatch => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: 'DELETE'
    })
    promise
      .then((result) => {
        // Gọi lại thủ công sau mỗi lần render để nó load lại dữ liệu lên
        dispatch(getTaskListApi())
      })
      .catch((errors) => {
        console.log(errors.response.data)

      })
  }
}
export const checkTaskApi = (taskName) => {
  return dispatch => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: 'PUT'
    })
    promise
      .then((response) => {
        console.log(response.data)
        dispatch(getTaskListApi())
      })
      .catch(errors => {
        console.log(errors.response.data)
      })
  }

}
export const rejectTaskApi = (taskName) => {
  return dispatch => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: 'PUT'
    })
    promise
      .then((response) => {
        console.log(response.data)
        dispatch(getTaskListApi())
      })
      .catch(errors => {
        console.log(errors.response.data)
      })

  }

}
