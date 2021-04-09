export const setActiveJob = (value) => (dispatch) => {
  dispatch({
    type: "SET_ACTIVE_JOB",
    payload: value,
  });
};

export const setActivePath = (value) => (dispatch) => {
  dispatch({
    type: "SET_ACTIVE_PATH",
  });
};
