
const finishCell = (state = [19,49], action) => {
    switch(action.type)
    {
        case "SET_FINISH":
            return action.payload;
        default:
            return state;
    }
}

export default finishCell;
