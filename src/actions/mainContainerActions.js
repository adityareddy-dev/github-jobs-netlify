export const storeJobsToDisplay = (jobsArray) => (dispatch) => {
  console.log(jobsArray);
  dispatch({
    type: "STORE_JOBS_TO_DISPLAY",
    payload: jobsArray,
  });
};
