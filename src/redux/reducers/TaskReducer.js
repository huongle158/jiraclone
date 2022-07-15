import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_USER_ASSIGN } from "../../util/constants/Cyberbugs/TaskConstants"

const initialState = {
    taskDetailModel: {
        "priorityTask": {
            "priorityId": 2,
            "priority": "Medium"
        },
        "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
        },
        "assigness": [
            {
                "id": 2123,
                "avatar": "https://ui-avatars.com/api/?name=vanvo",
                "name": "vanvo",
                "alias": "vanvo"
            },
            {
                "id": 862,
                "avatar": "https://ui-avatars.com/api/?name=Testing123123",
                "name": "Testing123123",
                "alias": "crystal"
            }
        ],

        "lstComment": [],
        "taskId": 4751,
        "taskName": "Nhiệm vụ 1",
        "alias": "task-detail",
        "description": "<p>N&agrave;y l&agrave; task quan trọng</p>",
        "statusId": "3",
        "originalEstimate": 2,
        "timeTrackingSpent": 4,
        "timeTrackingRemaining": 4,
        "typeId": 1,
        "priorityId": 2,
        "projectId": 5565
    }
}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TASK_DETAIL: {
            return { ...state, taskDetailModel: action.taskDetailModel }
        }
            
        case CHANGE_TASK_MODAL: {
            console.log("action",action)

            const {name,value} =action            
            console.log("~ value", value)
            return {
                ...state,
                taskDetailModel: { ...state.taskDetailModel, [name]: value }
            }
        }
        case CHANGE_ASSIGNESS: {
            state.taskDetailModel.assigness = [...state.taskDetailModel.assigness, action.userSelected]
            
            return { ...state }
        }
        case REMOVE_USER_ASSIGN: {
            
            // Kiểm tra coi nó có ko, có xóa
            // => Những thằng khác mã userId của action giữ lại -> dùng thằng filter lọc
            state.taskDetailModel.assigness = [...state.taskDetailModel.assigness.filter(us=>us.id !== action.userId)]
            
                return { ...state}
            }

        default: {
            return { ...state }
        }

    }
}
