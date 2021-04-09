import produce from "immer";

const intialState = {
  lightMode: true,
};

const headerReducer = (state = intialState, action) => {
  switch (action.type) {
    case "TOGGLE_LIGHT_DARK_MODE":
      return produce(state, (draft) => {
        draft.lightMode = action.payload;
      });
    default:
      return state;
  }
};

export default headerReducer;
