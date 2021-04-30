import { INIT_FINISH_CORD } from "../constants";

const finishCell = (state = INIT_FINISH_CORD, action) => {
  switch (action.type) {
    case "SET_FINISH":
      return action.payload;
    default:
      return state;
  }
};

export default finishCell;
