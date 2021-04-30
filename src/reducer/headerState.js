import { START_STATE } from "../constants";

const headerState = (state = START_STATE, action) => {
  switch (action.type) {
    case "HEADER_SELECT":
      return action.payload;
    default:
      return state;
  }
};

export default headerState;
