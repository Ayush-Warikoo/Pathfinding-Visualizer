const forceUpdate = (state = "Start", action) => {
    switch(action.type)
    {
        case "FORCE_UPDATE":
            return action.payload;
        default:
            return state;
    }
}

export default forceUpdate;
