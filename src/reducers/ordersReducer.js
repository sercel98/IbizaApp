import { NEW_ORDER, REMOVE_ORDER } from "../actions/types";

const initialState = [];
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_ORDER: {
      return [
        action.payload,
        ...state.filter((order) => order.id !== action.payload.id),
      ];
    }
    case REMOVE_ORDER: {
      return state.filter((order) => order.id !== action.payload.id);
    }
  }
  return state;
};
export default orderReducer;
