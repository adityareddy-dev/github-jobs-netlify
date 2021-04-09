import React from "react";
import { connect } from "react-redux";
import EachJob from "./eachJob.jsx";
import "../less/job-list-panel.css";

class JobListPanel extends React.Component {
  constructor() {
    super();
    this.state = { jobOpen: false };
  }

  render() {
    return (
      <div className="job-list-panel-container">
        {this.props.jobsArray &&
          this.props.jobsArray.map((eachJob, index) => {
            return (
              <EachJob
                key={index}
                eachJob={eachJob}
                history={this.props.history}
                lightMode={this.props.lightMode}
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state,
    lightMode: state.headerReducer.lightMode,
    jobsArray: state.mainContainerReducer.jobsArray,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(JobListPanel);
