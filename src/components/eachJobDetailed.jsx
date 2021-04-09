import React from "react";
import { connect } from "react-redux";
import { setActiveJob } from "../actions/eachJobActions";
import moment from "moment";
import axios from "axios";
import Spinner from "./spinner.js";
import Button from "./button.js";
import { setActivePath } from "../actions/eachJobActions";
import "../less/button.css";
import "../less/eachJobDetailed.css";

class EachJobDetailed extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.setActivePath();
    axios
      .get(
        `https://personal-cors.herokuapp.com/https://jobs.github.com/positions/${this.props.match.params.id}.json`
      )
      .then((response) => {
        this.props.setActiveJob(response.data);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const job = this.props.activeJob;
    return (
      <div>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <>
            <header
              className={
                !this.props.lightMode
                  ? "job-details-header dark"
                  : "job-details-header"
              }
            >
              <div
                className={
                  !this.props.lightMode
                    ? "job-details-header__logo dark"
                    : "job-details-header__logo"
                }
              >
                <img src={job.company_logo} alt={job.company} />
              </div>
              <div className="job-details-header__company">
                <div className="job-details-header__company_company-url">
                  <h1
                    className={
                      !this.props.lightMode
                        ? "job-details-header__company__name dark"
                        : "job-details-header__company__name"
                    }
                  >
                    {job.company}
                  </h1>
                  <span className="job-details-header__company__url">
                    {job.company_url}
                  </span>
                </div>
                <button
                  className={
                    !this.props.lightMode ? "btnInverse dark" : "btnInverse"
                  }
                >
                  Company Site
                </button>
              </div>
            </header>
            <section
              className={
                !this.props.lightMode
                  ? "job-details-container dark"
                  : "job-details-container"
              }
            >
              <article>
                <header className="job-details-container__header">
                  <div
                    className={
                      !this.props.lightMode
                        ? "job-details-container__header__info dark"
                        : "job-details-container__header__info"
                    }
                  >
                    <span>{moment(new Date(job.created_at)).fromNow()}</span>
                    <span className="job-details-container__header__info__bullet">
                      &bull;
                    </span>
                    <span>{job.type}</span>
                    <div>
                      <h1
                        className={
                          !this.props.lightMode
                            ? "job-details-container__header__title dark"
                            : "job-details-container__header__title"
                        }
                      >
                        {job.title}
                      </h1>
                      <span className="job-details-container__header__location">
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <Button btnText="Apply Now" />
                </header>
                <div
                  className={
                    !this.props.lightMode
                      ? "job-details-container__description dark"
                      : "job-details-container__description"
                  }
                  dangerouslySetInnerHTML={{ __html: job.description }}
                ></div>
              </article>
            </section>
            <section
              className={
                !this.props.lightMode
                  ? "job-details-apply dark"
                  : "job-details-apply"
              }
            >
              <h2 className="job-details-apply__title">How to apply</h2>
              <article
                dangerouslySetInnerHTML={{ __html: job.how_to_apply }}
              ></article>
            </section>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lightMode: state.headerReducer.lightMode,
    jobsArray: state.mainContainerReducer.jobsArray,
    activeJob: state.eachJobReducer.activeJob,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setActiveJob: (activeJob) => dispatch(setActiveJob(activeJob)),
  setActivePath: () => dispatch(setActivePath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EachJobDetailed);
