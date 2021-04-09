import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { storeJobsToDisplay } from "../actions/mainContainerActions";
import { setActiveJob } from "../actions/eachJobActions";
import "../less/main-container.css";
import EachJobDetailed from "./eachJobDetailed";
import JobListPanel from "./jobListPanel";
import Button from "./button";
import Spinner from "./spinner";
import axios from "axios";
import SearchBar from "./searchBar";

class MainContainer extends React.Component {
  constructor() {
    super();
    this.state = { jobOpen: false, pageCount: 0, endOfResults: false };
  }

  componentDidMount() {
    this.props.setActiveJob(null);
    this.loadResults();
  }

  loadResults = () => {
    this.props.setActiveJob(null);
    this.setState({ loading: true });
    axios
      .get(
        `https://personal-cors.herokuapp.com/https://jobs.github.com/positions.json?page=${this.state.pageCount}`
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
  };

  handleLoadMoreClick = (event) => {
    if (event) event.preventDefault();
    if (!this.state.endOfResults) {
      this.loadResults();
    }
  };

  render() {
    console.log(window.location.href.endsWith("/"));
    return (
      <Router>
        <div
          className={
            !this.props.lightMode ? "main-container dark" : "main-container"
          }
        >
          <SearchBar />
          <div
            className="main-container-panel-list-container"
            style={{ paddingBottom: "50px" }}
          >
            <Switch>
              <Route exact path="/" component={JobListPanel} />
              <Route path="/:id" component={EachJobDetailed} />
            </Switch>
          </div>
          {this.props.activePath.endsWith("/") && (
            <div className="main-container-button-spinner">
              {!this.state.loading ? (
                <Button
                  btnText="Load More"
                  handleButtonClick={(event) => this.handleLoadMoreClick(event)}
                />
              ) : (
                <Spinner />
              )}
            </div>
          )}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lightMode: state.headerReducer.lightMode,
    searchObject: state.searchReducer.searchObject,
    keyword: state.searchReducer.searchObject.keyword,
    fullTime: state.searchReducer.searchObject.fullTime,
    location: state.searchReducer.searchObject.location,
    jobsArray: state.mainContainerReducer.jobsArray,
    activePath: state.eachJobReducer.activePath,
  };
};

const mapDispatchToProps = (dispatch) => ({
  storeJobsToDisplay: (jobsArray) => dispatch(storeJobsToDisplay(jobsArray)),
  setActiveJob: (activeJob) => dispatch(setActiveJob(activeJob)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
