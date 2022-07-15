import { baseService } from "./baseService";

// Bản chất kết thừa từ CyberbugsService
export class TaskTypeService extends baseService {
    // Muốn kế thừa lớp con phải có constructor
    constructor() {
        super();
    }

    getAllTaskType = () => {
        return this.get(`TaskType/getAll`)
    }



}

// Xử lý tạo một thành phần của lớp đối tượng để chứa những phương thức này
export const taskTypeService = new TaskTypeService();