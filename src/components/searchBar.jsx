import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { freshSearch } from "../actions/searchBarActions";
import { storeJobsToDisplay } from "../actions/mainContainerActions";
import "../less/search-bar.css";
import Button from "./button";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
      location: "",
      fullTime: false,
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
  };

  handleKeywordChange = (event) => {
    event.preventDefault();
    this.setState({ keyword: event.target.value });
  };

  handleLocationChange = (event) => {
    event.preventDefault();
    this.setState({ location: event.target.value });
  };

  handleButtonClick = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios
      .get(
        `https://personal-cors.herokuapp.com/https://jobs.github.com/positions.json?desctiption=${
          this.state.keyword
        }&location=${this.state.location}&fullTime=${
          this.state.fullTime ? this.state.fullTime : ""
        }`
      )
      .then((response) => {
        this.props.storeJobsToDisplay(response.data);
        if (response.data.length < 50) {
          this.setState({ endOfResults: true });
        } else {
          let pageCount = this.state.pageCount + 1;
          this.setState({ pageCount });
        }
        this.setState({ loading: false });
      });
    this.props.freshSearch(this.state);
  };

  handleCheckboxChange = (event) => {
    this.setState({ fullTime: event.target.checked });
  };

  render() {
    return (
      <form
        className={!this.props.lightMode ? "search-form dark" : "search-form"}
        onSubmit={(e) => this.handleFormSubmit(e)}
      >
        <div className="search-form__input-container search-form__main-filter">
          <i class="fa fa-search" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="Filter by title, companies, expertise..."
            className={
              !this.props.lightMode
                ? "search-form__input dark"
                : "search-form__input"
            }
            value={this.state.keyword}
            onChange={(event) => this.handleKeywordChange(event)}
          />
          <i className="bi bi-filter"></i>
          <button className="search-form__main-filter__btn">
            <i class="bi bi-filter"></i>
          </button>
        </div>
        <div className="search-form__input-container search-form__location-filter">
          <i className="fa fa-map-marker" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="Filter by location"
            className={
              !this.props.lightMode
                ? " search-form__input search-form__location__filter dark"
                : "search-form__input search-form__location__filter"
            }
            // onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="search-form__input-container search-form__checkbox-container">
          <input
            type="checkbox"
            name="full-time"
            className="search-form__input search-form__checkbox"
            checked={this.state.fullTime}
            onChange={(event) => this.handleCheckboxChange(event)}
          />
          <label
            htmlFor="full-time"
            className={
              !this.props.lightMode
                ? "search-form__checkbox__label dark"
                : "search-form__checkbox__label"
            }
          >
            Full Time Only
          </label>
          <Button
            btnText="Search"
            handleButtonClick={(event) => this.handleButtonClick(event)}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lightMode: state.headerReducer.lightMode,
    searchObject: state.searchReducer.searchObject,
    jobsArray: state.mainContainerReducer.jobsArray,
    activePath: state.eachJobReducer.activePath,
  };
};

const mapDispatchToProps = (dispatch) => ({
  freshSearch: (searchObject) => dispatch(freshSearch(searchObject)),
  storeJobsToDisplay: (jobsArray) => dispatch(storeJobsToDisplay(jobsArray)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
