import * as Axios from 'axios'
import { delay, fork, take, takeEvery, takeLatest, call, put, select } from 'redux-saga/effects'
import { cyberbugsService } from '../../../services/CyberbugsService'
import { STATUS_CODE } from '../../../util/constants/settingSystem'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
// Lấy từ UserBugsSaga
import { push } from "react-router-redux"
import { history } from '../../../util/libs/history';
import { projectService } from '../../../services/ProjectService';
import { notiFunction } from '../../../util/Notification/notificationCyberbugs';
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from '../../../util/constants/Cyberbugs/ProjectConstatnts';
import { GET_USER_BY_PROJECT_ID_SAGA } from '../../../util/constants/Cyberbugs/UserConstants';



function* createProjectSaga(action) {

    // hIỂN THỊ lOADING
    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(500);

    try {
        // Gọi api lấy dữ liệu về    
        const { data, status } = yield call(() => cyberbugsService.createProjectAuthorization(action.newProject))

        // Goi api thành công thì dispatch lên reducer thong qua put
        if (status === STATUS_CODE.SUCCESS) {
            // Điều hướng trang
            // Lấy giá trị về từ reducer
            let history = yield select(state => state.HistoryReducer.history)
            // Bản chất history chính là navigate nhưng đặt tên vậy cho thống nhất
            history('/projectmanagement')
        }
    } catch (err) {
        console.log("~ err: ", err.response.data)
    }
    // Success hay faild cũng tắt loading
    yield put({
        type: HIDE_LOADING
    })

}

export function* theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}



// Saga dùng để get All Project lấy từ saga 29/5/2022
function* getListProjectSafa(action) {
    try {
    // Call nhận vào callback trả ra promise
        const {status,data}=yield call(() => cyberbugsService.getListProject());
        if (status === STATUS_CODE.SUCCESS) {
            // Gọi action Put lên reducer sau khi call api thành công
            yield put({
                type: 'GET_LIST_PROJECT',
                projectList:data.content
            })
        }
    } catch (err) {
        console.log("~ err", err)
    }

}
 

export function* theoDoigetListProjectSaga() {
    yield takeLatest('GET_LIST_PROJECT_SAGA', getListProjectSafa);
}

// updateProject
function* updateProjectSaga(action) {
    

    // hIỂN THỊ lOADING
    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(500);

    try {
        // Gọi api lấy dữ liệu về    
        const { data, status } = yield call(() => cyberbugsService.updateProject(action.projectUpdate))

        // Goi api thành công thì dispatch lên reducer thong qua put
        if (status === STATUS_CODE.SUCCESS) {
            // console.log("ADD", data)
            // Điều hướng trang
            // Lấy giá trị về từ reducer
            let history = yield select(state => state.HistoryReducer.history)
            // Bản chất history chính là navigate nhưng đặt tên vậy cho thống nhất
            // history('/projectmanagement')
            // Tự update lại list project
            yield put({
                type: 'GET_LIST_PROJECT_SAGA'
            })
            // tắt form drawer đi bằng cách gửi action lên reducer
            yield put({
                type: 'CLOSE_DRAWER'
            })
            // Ngoài cah1 yield put cũng có thể dùng yield call , nhưng chỉ cần để tên action thôi
        }
    } catch (err) {
        console.log("~ err: ", err.response.data)
    }
    // Success hay faild cũng tắt loading
    yield put({
        type: HIDE_LOADING
    })

}
export function* theoDoiUpdateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga);
}

// Xóa project
function* deleteProjectSaga(action) {

    // hIỂN THỊ lOADING
    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(500);

    try {
        // Gọi api lấy dữ liệu về    
        const { data, status } = yield call(() => {
            return projectService.deleteProject(action.idProject)
        }
            
        )
        

        if (status === STATUS_CODE.SUCCESS) {
            // Thong bao xoa thành công
            notiFunction('success', "Delete project successfully!!!", "")

            yield put({
                type: 'GET_LIST_PROJECT_SAGA'
            })
            // tắt form drawer đi bằng cách gửi action lên reducer
            yield put({
                type: 'CLOSE_DRAWER'
            })
            // Ngoài cah1 yield put cũng có thể dùng yield call , nhưng chỉ cần để tên action thôi
        }
    } catch (err) {
        notiFunction('error', "Delete project is failed", "")
        console.log("~ err: ", err.response.data)
    }
    // Success hay faild cũng tắt loading
    yield put({
        type: HIDE_LOADING
    })

}
export function* theoDoiDeleteProject() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga);
}

// Xem projectDetail 
function* getProjectDetailSaga(action) {

    // hIỂN THỊ lOADING
    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(500);

    try {
        // Gọi api lấy dữ liệu về    
        const { data, status } = yield call(() => {
            return projectService.getProjectDetail(action.projectId)
        })
        
        
        // Lấy dữ liệu thành công đưa nó lên redux 
        yield put({
            type: 'PUT_PROJECT_DETAIL',
            projectDetail: data.content
        })

    } catch (err) {
        console.log("~ err", err.response.data)
        // Điều hướng trang
        // Lấy giá trị về từ reducer
        let history = yield select(state => state.HistoryReducer.history)
        // Bản chất history chính là navigate nhưng đặt tên vậy cho thống nhất
        // history('/projectmanagement')
       
    }
    // Success hay faild cũng tắt loading
    yield put({
        type: HIDE_LOADING
    })

}
export function* theoDoiGetProjectDetail() {
    yield takeLatest('GET_PROJECT_DETAIL', getProjectDetailSaga);
}

// getAllProject
function* getAllProjectSaga(action) {

    // hIỂN THỊ lOADING
    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(500);

    try {
        // Gọi api lấy dữ liệu về    
        const { data, status } = yield call(() => {
            return projectService.getAllProject()
        })
        console.log("~ data", data)
        
        // Lấy dữ liệu thành công đưa nó lên redux 
        yield put({
            type: GET_ALL_PROJECT,
            arrProject: data.content
        })
        yield put({
            type: GET_USER_BY_PROJECT_ID_SAGA,
                // Truyền lên projectId đâu tiên
            idProject: data.content[0]?.id
        })

    } catch (err) {
        console.log("404 not found")
        // Điều hướng trang
        // Lấy giá trị về từ reducer
        let history = yield select(state => state.HistoryReducer.history)
        // Bản chất history chính là navigate nhưng đặt tên vậy cho thống nhất
        history('/projectmanagement')

    }
    // Success hay faild cũng tắt loading
    yield put({
        type: HIDE_LOADING
    })

}
export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}

