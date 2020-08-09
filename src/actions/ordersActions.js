import { NEW_ORDER, REMOVE_ORDER } from "./types";
export const newOrder = (order) => ({
  type: NEW_ORDER,
  payload: order,
});

export const removeOrder = (order) => ({
  type: REMOVE_ORDER,
  payload: order,
});
