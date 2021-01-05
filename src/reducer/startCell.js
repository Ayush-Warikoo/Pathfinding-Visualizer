
const startCell = (state = [0,0], action) => {
    switch(action.type)
    {
        case "SET_START":
            return action.payload;
        default:
            return state;
    }
}

export default startCell;

