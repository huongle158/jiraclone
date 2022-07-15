import Axios from 'axios'
import { delay, fork, take, takeEvery, takeLatest, call, put,select } from 'redux-saga/effects'
import { cyberbugsService } from '../../../services/CyberbugsService';
import { USER_SIGNIN_API, USLOGIN } from '../../constants/Cyberbugs/Cyberbugs'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem'
import { push } from "react-router-redux"
import { history } from '../../../util/libs/history';
import {  userService } from '../../../services/UserService';
import { projectService } from '../../../services/ProjectService';
import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA } from '../../../util/constants/Cyberbugs/UserConstants';

/* 2/5/2022  */
// Quản lý các action saga
function* signinSaga(action) {
    console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    // Gọi api dựa vào service
    try {
        const { data, status } = yield call(() => {
            return cyberbugsService.signinCyberBugs(action.userLogin)
        });
        // Lưu vào localstorage khi đăng nhập thành công
        localStorage.setItem(TOKEN, data.content.accessToken)
        // Khi lưu vào localStorage ko thể lưu object -> biến đổi thành string
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))
        // Lỡ ng dùng đăng nhập tk khác, phải clear để load lại
        yield put({
            type: USLOGIN,
            userLogin:data.content
        })

       
        // action.userLogin.navigate('/home')
        
        // Lấy giá trị về từ reducer
        let history = yield select(state => state.HistoryReducer.history)
        // Bản chất history chính là navigate nhưng đặt tên vậy cho thống nhất
        history('/projectmanagement')

        // Nếu dùng v4
        // history.push('/home');
        
     
    } catch (err) {
        console.log('error', err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}

// Hiển thị chức năng đề xuất tìm kiếm addmembers
function* getUserSaga(action) {
    // action.keyWord 
  
    try {
        const { data, status } = yield call(() => {
            return userService.getUser(action.keyWord)
        });
        yield put({
            type: 'GET_USER_SEARCH',
            listUserSearch: data.content
        })

       

    } catch (err) {
        console.log('error', err.response.data)
    }
   
}


export function* theoDoiGetUser() {
    yield takeLatest('GET_USER_API', getUserSaga);
}

// Thêm member vào project
function* addUserProjectSaga(action) {
    // action.keyWord 

    try {
        const { data, status } = yield call(() => {
            return userService.assignUserProject(action.userProject)
        });

        // Load lại cập nhật lại

        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })

       

    } catch (err) {
        console.log('error', err.response.data)
    }

}


export function* theoDoiAddUserProject() {
    yield takeLatest('ADD_USER_PROJECT_API', addUserProjectSaga);
}

// Remove member khỏi project
function* removeUserProjectSaga(action) {
    // action.keyWord 

    try {
        const { data, status } = yield call(() => {
            return projectService.deleteUserFromProject(action.userProject)
        });

        // Load lại cập nhật lại

        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })



    } catch (err) {
        console.log('error', err.response.data)
    }

}

export function* theoDoiRemoveUserProject() {
    yield takeLatest('REMOVE_USER_PROJECT_API', removeUserProjectSaga);
}

// Thêm user vào project theo projectId
function* getUserByProjectIdSaga(action) {

    const {idProject} = action

    try {
        const { data, status } = yield call(() => {
            return userService.getUserByProjectId(idProject)
        });

        // Load lại cập nhật lại
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser:data.content
            })
        }

    } catch (err) {
        console.log("~ err", err.response?.data)
        console.log("Vào đây")
        // Tức 404 not found
        if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
            // dispatch len mảng rỗng dể nó trả rỗng chứ ko lỗi
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: []
            })
  
            
        }
    
    }

}

export function* theoDoiGetUserByProjectIdSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}




