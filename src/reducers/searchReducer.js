import produce from "immer";

const intialState = {
  searchObject: {},
};

const searchReducer = (state = intialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "FERSH_SEARCH":
      return produce(state, (draft) => {
        draft.searchObject = action.payload;
      });
    default:
      return state;
  }
};

export default searchReducer;
