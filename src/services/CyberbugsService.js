import Axios from 'axios'
const { DOMAIN_CYBERBUG, TOKEN } = require('../util/constants/settingSystem')

export const cyberbugsService = {
    signinCyberBugs: (userLogin) => { 
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Users/signin`,
            method: 'POST',
            data: userLogin
        })
    }, 
    getAllProjectCategory: () => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
            method: 'GET'
        })
    },
    createProject: (newProject) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}//Project/createProject`,
            method: 'POST',
            data: newProject
        })
    },
    createProjectAuthorization: (newProject) => {      
        console.log(localStorage.getItem(TOKEN))
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: {'Authorization':`Bearer `+localStorage.getItem(TOKEN)}
        })
    },
    getListProject: ()=>{
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/getAllProject`,
            method: 'GET',
            // Tuy nhiên ta phải chứng minh đa đăng nhập nên ta phải thêm token yêu cầu từ BE chứng minh đã đăng nhập
            headers: { 'Authorization': `Bearer ` + localStorage.getItem(TOKEN) }
        })
    },
    updateProject: (projectUpdate) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectUpdate.id}`,
            method: 'PUT',
            data:projectUpdate,
            // Tuy nhiên ta phải chứng minh đa đăng nhập nên ta phải thêm token yêu cầu từ BE chứng minh đã đăng nhập
            headers: { 'Authorization': `Bearer ` + localStorage.getItem(TOKEN) }
        })
    }



}