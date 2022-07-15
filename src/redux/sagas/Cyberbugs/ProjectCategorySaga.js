import Axios from 'axios'
import { delay, fork, take, takeEvery, takeLatest, call, put, select } from 'redux-saga/effects'
import { cyberbugsService } from '../../../services/CyberbugsService'
import { STATUS_CODE } from '../../../util/constants/settingSystem'
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../constants/Cyberbugs/Cyberbugs'


function * getAllProjectCategorySaga(action) {
    // Tham số nhận trong call là hàm trả về promise
    try {
        // Gọi api lấy dữ liệu về    
        const { data, status } = yield call(() => cyberbugsService.getAllProjectCategory())
        
        // Goi api thành công thì dispatch lên reducer thong qua put
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            })            
        }
    } catch (err) { 
    console.log("~ err: ", err.response.data)
    }


   
    
}

export function* theoDoiGetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}