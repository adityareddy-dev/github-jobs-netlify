import axios from "axios";

export const getAllJobs = () => {
  axios
    .get(
      "https://personal-cors.herokuapp.com/https://jobs.github.com/positions.json"
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
};

export const getWithLocation = (locationString) => {
  axios
    .get(
      `https://personal-cors.herokuapp.com/https://jobs.github.com/positions.json?location=${locationString}`
    )
    .then((response) => {
      console.log(response);
    })
    .catch((Error) => {
      console.log(Error);
    });
};
