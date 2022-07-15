import Axios from 'axios'
import { delay, fork, take, takeEvery, takeLatest, call, put, select } from 'redux-saga/effects'
import { cyberbugsService } from '../../../services/CyberbugsService'
import { STATUS_CODE } from '../../../util/constants/settingSystem'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
// Lấy từ UserBugsSaga
import { push } from "react-router-redux"
import { history } from '../../../util/libs/history';
import { taskTypeService } from '../../../services/TaskTypeService';
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from '../../../util/constants/Cyberbugs/TaskTypeConstants';


function* getAllTaskTypeSaga() {
    try {
        const { data, status } = yield call(() => taskTypeService.getAllTaskType())

        yield put({
            type: GET_ALL_TASK_TYPE,
            arrTaskType:data.content
        })
        
    } catch (err) {
    console.log("~ err", err)
        
    }
}
export function* theoDoiGetAllTaskTypeSaga() {
    // takeLatest là bản nâng cấp của takeevery -> nên ôn tập lại
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga)
}