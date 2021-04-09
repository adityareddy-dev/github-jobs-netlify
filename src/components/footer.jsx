import React from "react";
import Button from "./button.js";
import { connect } from "react-redux";
import "../less/eachJobDetailed.css";
import "../less/footer.css";

class Footer extends React.Component {
  render() {
    console.log(this.props.activeJob);
    return (
      <footer
        className={
          !this.props.lightMode
            ? "job-details-footer dark"
            : "job-details-footer"
        }
      >
        {this.props.activeJob && (
          <div
            className={
              !this.props.lightMode
                ? "job-details-footer-container dark"
                : "job-details-footer-container"
            }
          >
            <div className="job-details-footer__info">
              <span
                className={
                  !this.props.lightMode
                    ? "job-details-footer__info__title dark"
                    : "job-details-footer__info__title"
                }
              >
                {this.props.activeJob.title}
              </span>
              <span className="job-details-footer__info__company">
                {this.props.activeJob.company}
              </span>
            </div>
            <div>
              <Button btnText="Apply Now" />
            </div>
          </div>
        )}
      </footer>
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

export default connect(mapStateToProps)(Footer);
