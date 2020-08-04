import { LOGIN, LOGOUT } from "../actions/types";

const initialState = false;
const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return true;
    }
    case LOGOUT: {
      return false;
    }
  }
  return state;
};
export default authenticationReducer;
