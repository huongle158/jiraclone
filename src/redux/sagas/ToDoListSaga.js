import Axios from 'axios'
import { delay, fork, take, takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import { toDoListService } from '../../services/ToDoListService'
import { ADD_TASK_API, GET_TASKLIST_API, GET_TASK_API, DELETE_TASK_API, CHECK_TASK_API, REJECT_TASK_API } from '../constants/ToDoListConst'
import { STATUS_CODE } from '../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst'


/*
14/4/2022 HuongLe is learning 
Action saga lấy danh sách task từ api
 */

function* getTaskApiAction(action) {
    // put action để hiện thị loading, put giống dispatch action, yield put xong mới lấy data về
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        //  yield call như set điều kiện, chỉ khi nó thành công rồi nó mới thực hiện các thằng dưới -> blocking
        let { data, status } = yield call(toDoListService.getTaskApi)
        yield delay(500)
        if (status === STATUS_CODE.SUCCESS) {
            // Sau khi lấy giá tri thành công, dùng put(giống dispatch bên thunk)
            yield put({
                type: GET_TASK_API,
                taskList: data
            })

        } else {
            console.log('error')
        }

    } catch (err) {

    }
    // Ấn loading đi sau khi tải xong dữ liệu
    yield put({
        type: HIDE_LOADING
    })

}
export function* theoDoiActionGetTaskApi() {
    yield takeLatest(GET_TASKLIST_API, getTaskApiAction)
}
/*
14/4/2022 HuongLe is learning 
Action saga thêm task từ api
 */
function* addTaskApiAction(action) {
    const {taskName} = action
    // Gọi api, lưu ý trong nội dung call phải nhận vào function chứ ko phải promise=> ko gọi hàm đó vô dc mà phải truyền qua callback
    try {
        const { data, status } = yield call(() => { return toDoListService.addTaskApi(taskName) })
        // Lưu ý phải có yield nó mới chạu tiếp tục vào
        if (status === STATUS_CODE.SUCCESS) {
           yield put({
                type: GET_TASKLIST_API
            })
        }
        else {

        }
   
        
    } catch (err) {
    console.log("~ err", err)
    }
   

}
export function* theoDoiActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API,addTaskApiAction)
}
/* delete task
 */
function* deleteTaskApiAction(action) {
    const {taskName} = action
    try {
        // call nhận function(function này trả về giát rị promise) chứ ko dc truyển thẳng promise vào
        const { data, status } = yield call(() => {
            return toDoListService.deleteTaskApi(taskName)
        })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_TASKLIST_API
            })
        } 
    } catch (err) {
        console.log('err')

    }
}

export function* theoDoiActionDeleteTaskApi() {
    yield takeLatest(DELETE_TASK_API,deleteTaskApiAction)
}
/* donetask
 */
function* doneTaskApiAction(action) {
    const {taskName} = action
    try {
        // call nhận function(function này trả về giát trị promise) chứ ko dc truyển thẳng promise vào
        const { data, status } = yield call(() => {
            return toDoListService.checkDoneTask(taskName)
        })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_TASKLIST_API
            })
        } 
    } catch (err) {
        console.log('err')
    }
}

export function* theoDoiActionDoneTaskApi() {
    yield takeLatest(CHECK_TASK_API,doneTaskApiAction)
}
/* reject task
 */
function* rejectTaskApiAction(action) {
    const {taskName} = action
    try {
        // call nhận function(function này trả về giát trị promise) chứ ko dc truyển thẳng promise vào
        const { data, status } = yield call(() => {
            return toDoListService.rejectTask(taskName)
        })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_TASKLIST_API
            })
        } 
    } catch (err) {
        console.log('err')
    }
}

export function* theoDoiActionRejectTaskApi() {
    yield takeLatest(REJECT_TASK_API,rejectTaskApiAction)
}