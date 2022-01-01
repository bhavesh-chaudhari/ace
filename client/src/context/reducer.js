import {
  SET_LOADING,
  SET_USER,
  LOGIN_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  OPEN_MODAL
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
      return { ...state, isLoading: false, isModalOpen: false, user: action.payload };
    case OPEN_MODAL: 
      return {...state, isModalOpen: action.payload}
    default:
      return state;
  }
};

export default reducer;
