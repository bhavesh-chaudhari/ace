import {SET_LOADING, SET_USER} from "./actions"

const reducer = (state, action) =>{
    switch (action.type) {
        case SET_LOADING:
            return {...state, isLoading: true}      
        case SET_USER:
            return {...state, user: action.payload}      
        default:
            return state;
    }
}

export default reducer