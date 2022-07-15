import { USER_SIGNIN_API } from "../constants/Cyberbugs/Cyberbugs"



export const signinCyberbugAction = (email, password,navigate) => {
    return {
        type: USER_SIGNIN_API,
        userLogin: {
            email: email,
            password: password,
            navigate:navigate
        }
    }
}