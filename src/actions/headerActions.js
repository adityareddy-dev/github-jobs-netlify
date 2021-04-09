export const toggleLightDarkMode = (value) => (dispatch) => {
  console.log(value);
  dispatch({
    type: "TOGGLE_LIGHT_DARK_MODE",
    payload: value,
  });
};
