import { baseService } from "./baseService";

// Bản chất kết thừa từ CyberbugsService
export class ProjectService extends baseService{
    // Muốn kế thừa lớp con phải có constructor
    constructor() {
        super();
    }

    getAllProject = () => {
        return this.get(`Project/getAllProject`);
    }


    // Nghiệp vụ xóa 
    deleteProject = (id) => {
        return this.delete(`Project/deleteProject?projectId=${id}`);
    }

    // Xóa members khỏi dự án
    deleteUserFromProject = (userProject) => {
        return this.post(`Project/removeUserFromProject`,userProject)
    }

    // Xem projectDetail
    getProjectDetail = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`)
    }

    


}

// Xử lý tạo một thành phần của lớp đối tượng để chứa những phương thức này
export const projectService = new ProjectService();