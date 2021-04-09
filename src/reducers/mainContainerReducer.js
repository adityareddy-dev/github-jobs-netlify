import produce from "immer";

const intialState = {
  jobsArray: [],
};

const mainContainerReducer = (state = intialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "STORE_JOBS_TO_DISPLAY":
      let jobsArray = [...state.jobsArray];
      action.payload.forEach((element) => {
        jobsArray.push(element);
      });
      return produce(state, (draft) => {
        draft.jobsArray = jobsArray;
      });
    default:
      return state;
  }
};

export default mainContainerReducer;
