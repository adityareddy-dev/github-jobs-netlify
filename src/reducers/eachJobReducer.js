import produce from "immer";

const intialState = {
  activeJob: {},
  activePath: window.location.href,
};

const eachJobReducer = (state = intialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_JOB":
      return produce(state, (draft) => {
        draft.activeJob = action.payload;
      });
    case "SET_ACTIVE_PATH":
      return produce(state, (draft) => {
        draft.activePath = window.location.href;
      });
    default:
      return state;
  }
};

export default eachJobReducer;
