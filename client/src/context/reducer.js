import {
  SET_LOADING,
  SET_USER,
  LOGIN_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  OPEN_MODAL,
  LOGOUT,
  START_PROFILE_UPDATE
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_USER:
      return { ...state, isLoading: false, user: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload };
    case SIGNUP_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload };
    case EDIT_USER_SUCCESS:
      return { ...state, profileIsUpdating: false , isModalOpen: false, user: action.payload };
    case OPEN_MODAL: 
      return {...state, isModalOpen: action.payload}
    case LOGOUT:
      return {...state, user: null, isLoading: false}
    case START_PROFILE_UPDATE:
      return {...state, profileIsUpdating: action.payload }
    default:
      return state;
  }
};

export default reducer;
