import { baseService } from "./baseService";

// Bản chất kết thừa từ CyberbugsService
export class StatusService extends baseService {
    // Muốn kế thừa lớp con phải có constructor
    constructor() {
        super();
    }

    getAllStatus = () => {
        return this.get(`Status/getAll`);
    }


   


}

// Xử lý tạo một thành phần của lớp đối tượng để chứa những phương thức này
export const statusService = new StatusService();