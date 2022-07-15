import { baseService } from "./baseService";

// Bản chất kết thừa từ CyberbugsService
export class TaskService extends baseService {
    // Muốn kế thừa lớp con phải có constructor
    constructor() {
        super();
    }

    createTask = (taskObject) => {
        return this.post(`Project/createTask`,taskObject)
    }

    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }
    updateStatusTask = (taskStatusUpdate) => {
        return this.put(`Project/updateStatus`,taskStatusUpdate)
    }

    updateTask = (taskUpdate) => {
        return this.post(`Project/updateTask`,taskUpdate)
    }
    


}

// Xử lý tạo một thành phần của lớp đối tượng để chứa những phương thức này
export const taskService = new TaskService();