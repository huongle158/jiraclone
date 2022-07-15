import { baseService } from "./baseService";

// Bản chất kết thừa từ CyberbugsService
export class UserService extends baseService {
    // Muốn kế thừa lớp con phải có constructor
    constructor() {
        super();
    }
    // Nghiệp vụ xóa 
    getUser = (keyWord) => {
        return this.get(`Users/getUser?keyword=${keyWord}`);
    }
    
    // Thêm member vào project
    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`,userProject)
    }

    // Lấy user theo projectId
    getUserByProjectId = (idProject) => {
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
    }


}

// Xử lý tạo một thành phần của lớp đối tượng để chứa những phương thức này
export const userService = new UserService();