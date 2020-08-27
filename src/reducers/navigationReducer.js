import { SPLASH_SCREEN_ENDED } from "../actions/types";

const initialState = {splashScreenVideo: true};
const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPLASH_SCREEN_ENDED: {
      return {
        splashScreenVideo: false
      }
    }
  }
  return state;
};
export default navigationReducer;
