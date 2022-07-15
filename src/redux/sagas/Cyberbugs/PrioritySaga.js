import Axios from 'axios'
import { delay, fork, take, takeEvery, takeLatest, call, put, select } from 'redux-saga/effects'
import { cyberbugsService } from '../../../services/CyberbugsService'
import { STATUS_CODE } from '../../../util/constants/settingSystem'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
// Lấy từ UserBugsSaga
import { push } from "react-router-redux"
import { history } from '../../../util/libs/history';
import { priorityService } from '../../../services/PriorityService';
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from '../../../util/constants/Cyberbugs/PriorityConstant';



function* getAllPrioritySaga() {
    try {
        const { data, status } = yield call(() => priorityService.getAllPriority())

        yield put({
            type: GET_ALL_PRIORITY,
            arrPriority: data.content
        })


    } catch (err) {
        console.log("~ err", err)

    }
}
export function* theoDoiGetAllPrioritySaga() {
    // takeLatest là bản nâng cấp của takeevery -> nên ôn tập lại
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga)
}