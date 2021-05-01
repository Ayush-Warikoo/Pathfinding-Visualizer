import { INIT_START_CORD } from "../constants";

const startCell = (state = INIT_START_CORD, action) => {
    switch (action.type) {
        case "SET_START":
            return action.payload;
        default:
            return state;
    }
};

export default startCell;
