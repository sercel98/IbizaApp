import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART } from "../actions/types";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        items: [...state.items, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        items: state.items.filter(
          (cartItem) => cartItem.product.id !== action.payload.id
        ),
      };
    case EMPTY_CART:
      return {
        items: []
      };
  }
  return state;
};

export default cartReducer;
