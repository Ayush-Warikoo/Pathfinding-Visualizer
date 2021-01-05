const headerState = (state = "Start", action) => {
    switch(action.type)
    {
        case "HEADER_SELECT":
            return action.payload;
        default:
            return state;
    }
}

export default headerState;
