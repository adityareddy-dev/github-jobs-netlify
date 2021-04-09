export const freshSearch = (searchObject) => (dispatch) => {
  console.log(searchObject);
  dispatch({
    type: "FRESH_SEARCH",
    payload: searchObject,
  });
};
