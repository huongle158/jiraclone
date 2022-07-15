import * as Axios from 'axios'
import { delay, fork, take, takeEvery, takeLatest, call, put, select } from 'redux-saga/effects'
import { cyberbugsService } from '../../../services/CyberbugsService'
import { STATUS_CODE } from '../../../util/constants/settingSystem'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
// Lấy từ UserBugsSaga
import { push } from "react-router-redux"
import { history } from '../../../util/libs/history';
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from '../../../util/constants/Cyberbugs/TaskTypeConstants';
import { taskService } from '../../../services/TaskService';
import { notiFunction } from '../../../util/Notification/notificationCyberbugs';
import { GET_TASK_DETAIL_SAGA, GET_TASK_DETAIL, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA, HANDLE_CHANGE_POST_API_SAGA, CHANGE_TASK_MODAL, CHANGE_ASSIGNESS, REMOVE_USER_ASSIGN } from '../../../util/constants/Cyberbugs/TaskConstants';



function* createTaskSaga(action) {

    // hIỂN THỊ lOADING
    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(500);

    try {
        const { data, status } = yield call(() => taskService.createTask(action.taskObject))

        // Goi api thành công thì dispatch lên reducer thong qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)
        }

        yield put({
            type: 'CLOSE_DRAWER'
        })

        notiFunction('success', "Create task successfully!!!", "")


    } catch (err) {
        console.log("~ err", err.response.data)
        notiFunction('error', "Create task is failed", "")

    }
    // Success hay faild cũng tắt loading
    yield put({
        type: HIDE_LOADING
    })
    // Hiển thị thông báo thành công

}
export function* theoDoiCreateTaskSaga() {
    // takeLatest là bản nâng cấp của takeevery -> nên ôn tập lại
    yield takeLatest('CREATE_TASK_SAGA', createTaskSaga)
}

// Gọi taskDetail
function* getTaskDetailSaga(action) {

    try {
        const { data, status } = yield call(() => taskService.getTaskDetail(action.taskId))

        yield put({
            type: GET_TASK_DETAIL,
            taskDetailModel: data.content
        })

    } catch (err) {
        console.log("~ err", err.response.data)
    }


}
export function* theoDoiGetTaskDetailSaga() {
    // takeLatest là bản nâng cấp của takeevery -> nên ôn tập lại
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}

// update status task
function* updateTaskStatusSaga(action) {
    // console.log("~ action", action)

    const { taskStatusUpdate } = action

    try {
        // Cập nhật api status cho task hiện tại (TAsk đang mở modal chỉnh sửa)
        const { data, status } = yield call(() => taskService.updateStatusTask(taskStatusUpdate))
        console.log("~ data", data)

        // Sau khi thành công gọi lại getProjectDetailSaga để sắp xếp lại thông tin các task        
        if (status == STATUS_CODE.SUCCESS) {
            // Tiến hành gọi lại getTask cho nó cập nhật
            yield put({
                type: `GET_PROJECT_DETAIL`,
                projectId: taskStatusUpdate.projectId
            })
            // Cũng như cho nó cập nhật lại popup luôn
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskStatusUpdate.taskId
            })
        }

    } catch (err) {
        console.log("~ err", err)
        console.log("~ err", err.response.data)
    }


}
export function* theoDoiUpdateTaskStatusSaga() {
    // takeLatest là bản nâng cấp của takeevery -> nên ôn tập lại
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga)
}

// Update task
function* updateTaskSaga(action) {
    console.log("~ action", action)

    const { taskStatusUpdate } = action

    try {
        // Cập nhật api status cho task hiện tại (TAsk đang mở modal chỉnh sửa)
        const { data, status } = yield call(() => taskService.updateStatusTask(taskStatusUpdate))
        console.log("~ data", data)

        // Sau khi thành công gọi lại getProjectDetailSaga để sắp xếp lại thông tin các task        
        if (status == STATUS_CODE.SUCCESS) {
            // Tiến hành gọi lại getTask cho nó cập nhật
            yield put({
                type: `GET_PROJECT_DETAIL`,
                projectId: taskStatusUpdate.projectId
            })
            // Cũng như cho nó cập nhật lại popup luôn
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskStatusUpdate.taskId
            })
        }

    } catch (err) {
        console.log("~ err", err)
        console.log("~ err", err.response.data)
    }


}
export function* theoDoiUpdateTask() {
    // takeLatest là bản nâng cấp của takeevery -> nên ôn tập lại
    yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga)
}


// Xử lý 2 nghiệp vụ vừa change vừa api luôn
function* handleChangePostApi(action) {

    // Gọi action làm thay đổi taskDetailModel
    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const { name, value } = action;
            // Muốn thực hiện tuần tự thay vì dispatch thẳng ta dùng yield put
            yield put({
                type: CHANGE_TASK_MODAL,
                name,
                value
            })
        };
            break;
        
        case CHANGE_ASSIGNESS: {
            const { userSelected } = action
            yield put({
                type: CHANGE_ASSIGNESS,
                userSelected
            })
        };
            break;
            
        case REMOVE_USER_ASSIGN: {
            const { userId } = action
            yield put({
                type: REMOVE_USER_ASSIGN,
                // Tự render ra thuộc tính trùng tên -> dẫn đến userId mình đã bóc tách ở phía trên
                userId
            })
        }
            break;
    }

    // Save qua api updatetaskSaga
    // Lấy dữ liệu từ state.taskDetailModel (tức reducer xuống), lấy sau khi thay đổi (phần nghiệp vụ trên đã xử lý thay đổi)
    let { taskDetailModel } = yield select(state => state.TaskReducer)
    // Lưu ý phải có yield mới tuần tự
    // console.log("~ taskDetailModelc sau khi thay đổi", taskDetailModel)

    // Biến đổi dữ liệu state.taskDetailModel thành dl api cần
    const listUserAsign = taskDetailModel.assigness?.map((user,index) => {
        return user.id
    })
    // Giá trị trùng tên thuộc tính có thể bỏ để ES6 tự render
    // Biến đổi để giống object api yêu cầu
    const taskUpdateApi = {...taskDetailModel,listUserAsign}


    const { data, status } = yield call(() => taskService.updateTask(taskUpdateApi))
    try {
        if (status === STATUS_CODE.SUCCESS) {
            // Nếu thành công load lại 2 api, 1 là load lại task(getProjectDEtail trang tổng), 2 là load lại popup task Detail ngay sau khi thay đổi
            // Tiến hành gọi lại getTask cho nó cập nhật
            yield put({
                type: `GET_PROJECT_DETAIL`,
                projectId: taskUpdateApi.projectId
            })
            // Cũng như cho nó cập nhật lại popup luôn
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateApi.taskId
            })
        }
    } catch (err) {
    console.log("~ err", err)
    console.log("~ err", err.response?.data)
        
    }
  

}

export function* theoDoiHandleChangePostApi() {
    // takeLatest là bản nâng cấp của takeevery -> nên ôn tập lại
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi)
}


