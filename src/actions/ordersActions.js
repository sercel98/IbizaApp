import { NEW_ORDER } from "./types";
export const newOrder = (order) => ({
    type: NEW_ORDER,
    payload: order
});
