import {SET_LOADING, SET_USER, LOGIN_USER_SUCCESS, SIGNUP_USER_SUCCESS} from "./actions"

const reducer = (state, action) =>{
    switch (action.type) {
        case SET_LOADING:
            return {...state, isLoading: true}      
        case SET_USER:
            return {...state, user: action.payload}    
        case LOGIN_USER_SUCCESS:
            return {...state, isLoading: false, user: action.payload}
        case SIGNUP_USER_SUCCESS:
            return {...state, isLoading: false, user: action.payload}
        default:
            return state;
    }
}

export default reducer