import { GET_ALL_PROJECT, GET_LIST_PROJECT } from "../../util/constants/Cyberbugs/ProjectConstatnts";

const stateDefault = {
    projectList: [
        {
            id: 1, projectName: "Task1", description: '<p>Nhiệm vụ này khó đấy</p>'
        }
    ],
    // Tạo arr mới do sợ ảnh hưởng project list ở trang chủ
    arrProject: [],  //getAllProject cho dropdown
}

export const ProjectCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case GET_LIST_PROJECT: {
            state.projectList = action.projectList
            // console.log("~ action.projectList", action.projectList)
            return {...state}
        }
        case GET_ALL_PROJECT: {
            state.arrProject = action.arrProject;
            return {...state}
            }

        default:
            return { ...state }
    }
}
