import {
    LOGIN,
    USERNAME,
    LOGINOUT,
    TRUE,
    fLASE,
    GETLIST
} from '../action-type/user'
export const user = (state = {login: false}, action) => {
    switch (action.type) {
        case LOGIN:
            return {login: true};
        case USERNAME:
        return {login: true,userName:action.userName};
        case LOGINOUT:
            return {login: false,userName:''};
        default:
            return state
    }
}
export const articles =  (state={flag:false},action)=>{
    switch (action.type) {
        case TRUE:
            return {flag:true};
        case fLASE:
            return {flag:false};
        case GETLIST:
            let nameConnection = action.result.map(item=>item.name)
            return {nameConnection}
        default:
            return  state
    }
}