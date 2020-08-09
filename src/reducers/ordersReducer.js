import { NEW_ORDER } from "../actions/types";
const initialState = [];
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_ORDER: {
      return [...state, action.payload];
    }
  }
  return state;
};
export default orderReducer;
