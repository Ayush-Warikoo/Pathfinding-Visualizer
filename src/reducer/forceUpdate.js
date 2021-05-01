import { START_STATE } from "../constants";

const forceUpdate = (state = START_STATE, action) => {
    switch (action.type) {
        case "FORCE_UPDATE":
            return action.payload;
        default:
            return state;
    }
};

export default forceUpdate;
