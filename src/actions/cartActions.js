import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART } from "./types";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});
export const removeItem = (product) => ({
  type: REMOVE_FROM_CART,
  payload: product,
});
export const emptyCart = () => ({
  type: EMPTY_CART,
});
