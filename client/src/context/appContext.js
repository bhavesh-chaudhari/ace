import axios from "axios"
import React, {useContext, useEffect, useReducer} from "react"
import {SET_LOADING, SET_USER} from "./actions"
import reducer from "./reducer"

const initialState = {
    user: null,
    isLoading: false
}

const AppContext = React.createContext()

const AppProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, initialState)

    const BASE_URL = "http://localhost:5000/api/v1"

    const setLoading = ()=>{
        dispatch({type: SET_LOADING})
    }

    useEffect(()=>{
        axios({
            method: "GET",
            withCredentials: true,
            url: `${BASE_URL}/auth/authenticatedUser`
        }).then(res => {
            const loggedInUser = res.data.loggedInUser;
            dispatch({type: SET_USER, payload: loggedInUser})
        })
    }, [])

    return (
        <AppContext.Provider value={{...state, setLoading}}  >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppProvider}
