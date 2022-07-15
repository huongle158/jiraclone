import { applyMiddleware, combineReducers, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import ToDoListReducer from './reducers/ToDoListReducer'
import HistoryReducer from './reducers/HistoryReducer'
import UserLoginCyberBugsReducer from './reducers/UserCyberBugsReducer'
import {ProjectCategoryReducer} from './reducers/ProjectCategoryReducer'
import { ProjectCyberBugsReducer } from './reducers/ProjectCyberBugsReducer'
import { drawerReducer } from './reducers/DrawerCyberbugs'

import LoadingReducer from './reducers/LoadingReducer'
import { ProjectReducer } from './reducers/ProjectReducer'
import { TaskTypeReducer } from './reducers/TaskTypeReducer'
import { PriorityReducer } from './reducers/PriorityReducer'
import { StatusReducer } from './reducers/StatusReducer'
import { TaskReducer } from './reducers/TaskReducer'
// Vì export tự đặt tên nên phải nhập đúng tên
import {ModalReducer} from './reducers/ModalReducer'
// middleware saga
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './sagas/rootSaga';
// tạo ra biến middleWareSaga 
const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    // Chứa những reducers, reducers khai báo tại đây
    ToDoListReducer,
    LoadingReducer,
    ModalReducer, 
    HistoryReducer, 
    UserLoginCyberBugsReducer,
    ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    drawerReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer,
    
    
    
})

// Khởi tạo cái store
const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));
// Gọi saga
middleWareSaga.run(rootSaga)


export default store;