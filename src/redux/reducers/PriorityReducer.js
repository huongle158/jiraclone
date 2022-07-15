
import { GET_ALL_PRIORITY } from "../../util/constants/Cyberbugs/PriorityConstant"

const initialState = {
    arrPriority: []
}

export const PriorityReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_PRIORITY : {
            return { ...state, arrPriority: action.arrPriority }
        }

        default:
            return { ...state }
    }
}
