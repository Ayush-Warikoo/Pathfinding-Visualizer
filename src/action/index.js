//Action: Describes what action you are trying to do
export const headerSelect = (newState) =>
{
    return {
        type: 'HEADER_SELECT',
        payload: newState
    };
};


export const setStart = (newState) =>
{
    return {
        type: 'SET_START',
        payload: newState
    }
}

export const setFinish = (newState) =>
{
    return {
        type: 'SET_FINISH',
        payload: newState
    }
}

