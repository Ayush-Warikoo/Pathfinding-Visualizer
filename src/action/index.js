//Action: Describes what action you are trying to do
export const headerSelect = (newState) =>
{
  return {
    type: 'HEADER_SELECT',
    payload: newState

  };
};
