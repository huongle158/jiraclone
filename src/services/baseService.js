import Axios from 'axios'
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem"

// Tạo ra lớp đối tượng
export class baseService {
    // Trong đây định nghĩa những nghiệp vụ, phương thức

    // put json về phía backend
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/${url}`,
            method: 'PUT',
            data: model,
            // Cứ gửi token về phía server, nếu ko xài cũng ko sao hết
            headers: { 'Authorization': `Bearer ` + localStorage.getItem(TOKEN) }
        })
    }

    post = (url, model) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/${url}`,
            method: 'POST',
            data: model,
            // Cứ gửi token về phía server, nếu ko xài cũng ko sao hết
            headers: { 'Authorization': `Bearer ` + localStorage.getItem(TOKEN) }
        })
    }

    get = (url) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/${url}`,
            method: 'GET',
            // Cứ gửi token về phía server, nếu ko xài cũng ko sao hết
            headers: { 'Authorization': `Bearer ` + localStorage.getItem(TOKEN) }
        })
    }

    delete = (url) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/${url}`,
            method: 'DELETE',
            headers: { 'Authorization': `Bearer `+ localStorage.getItem(TOKEN) }
        })
    }






}
