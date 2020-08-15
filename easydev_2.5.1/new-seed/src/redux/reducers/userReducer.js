import {
    ADD_USER,
    CLEAR_USER,
  } from '../actions/userActions';
  
  const initialState = {
    userId: '',
    role: ''
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case ADD_USER:
        return { ...state, userId: state.userId };
      case CLEAR_USER:
        return { ...state, userId: state.userId };
      default:
        return state;
    }
  }
  