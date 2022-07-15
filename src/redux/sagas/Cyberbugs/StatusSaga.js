import Axios from 'axios'
import { delay, fork, take, takeEvery, takeLatest, call, put, select } from 'redux-saga/effects'
import { statusService } from '../../../services/StatusService'
import { STATUS_CODE } from '../../../util/constants/settingSystem'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
// Lấy từ UserBugsSaga
import { push } from "react-router-redux"
import { history } from '../../../util/libs/history';
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from '../../../util/constants/Cyberbugs/StatusConstants';


function* getAllStatusSaga() {
    try {
        const { data, status } = yield call(() => statusService.getAllStatus())

        yield put({
            type: GET_ALL_STATUS,
            arrStatus: data.content
        })

    } catch (err) {
        console.log("~ err", err)
        console.log("~ err", err.response?.data)

    }
}
export function* theoDoiGetAllStatusSaga() {
    // takeLatest là bản nâng cấp của takeevery -> nên ôn tập lại
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga)
}