import { all, takeLatest } from 'redux-saga/effects'
import * as ToDoListSaga from './ToDoListSaga'
import * as Cyberbugs from './Cyberbugs/UserCyberbugsSaga'
import * as  ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga'
import * as  ProjectSaga from './Cyberbugs/ProjectSaga'
import * as TaskTypeSaga  from './Cyberbugs/TaskTypeSaga'
import * as TaskSaga  from './Cyberbugs/TaskSaga'
import * as PrioritySaga  from './Cyberbugs/PrioritySaga'
import * as StatusSaga  from './Cyberbugs/StatusSaga'


export function* rootSaga() {
    // Nhận vào mảng các saga, các nghiệp vụ ta theo dõi
    yield all([
        // Nghiep vụ theo dõi các action saga todoList
        ToDoListSaga.theoDoiActionGetTaskApi(),
        ToDoListSaga.theoDoiActionAddTaskApi(),
        ToDoListSaga.theoDoiActionDeleteTaskApi(),
        ToDoListSaga.theoDoiActionDoneTaskApi(),
        ToDoListSaga.theoDoiActionRejectTaskApi(),
        // Nghiệp vụ Cyberbugs...
        Cyberbugs.theoDoiSignin(),
        Cyberbugs.theoDoiGetUser(),
        Cyberbugs.theoDoiAddUserProject(),
        Cyberbugs.theoDoiRemoveUserProject(),
        Cyberbugs.theoDoiGetUserByProjectIdSaga(),

        ProjectCategorySaga.theoDoiGetAllProjectCategory(),
        ProjectSaga.theoDoiCreateProjectSaga(),
        ProjectSaga.theoDoigetListProjectSaga(),
        ProjectSaga.theoDoiUpdateProjectSaga(),
        ProjectSaga.theoDoiDeleteProject(),
        ProjectSaga.theoDoiGetProjectDetail(),
        ProjectSaga.theoDoiGetAllProjectSaga(),

        TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
        
        PrioritySaga.theoDoiGetAllPrioritySaga(),

        TaskSaga.theoDoiCreateTaskSaga(),
        TaskSaga.theoDoiGetTaskDetailSaga(),
        TaskSaga.theoDoiUpdateTaskStatusSaga(),

        TaskSaga.theoDoiUpdateTask(),
        TaskSaga.theoDoiHandleChangePostApi(),

        StatusSaga.theoDoiGetAllStatusSaga(),






       

        


    ])
}