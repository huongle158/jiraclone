import { baseService } from "./baseService";

// Bản chất kết thừa từ CyberbugsService
export class PriorityService extends baseService {
    // Muốn kế thừa lớp con phải có constructor
    constructor() {
        super();
    }

    getAllPriority = () => {
        return this.get(`Priority/getAll`)
    }



}

// Xử lý tạo một thành phần của lớp đối tượng để chứa những phương thức này
export const priorityService = new PriorityService();