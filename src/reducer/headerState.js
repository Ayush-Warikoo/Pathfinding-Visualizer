const headerState = (state = "Start", action) => {
    switch(action.type)
    {
        case "HEADER_SELECT":
            return action.payload;
        default:
            return "Start";
    }
}

export default headerState;
