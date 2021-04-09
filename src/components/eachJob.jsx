import moment from "moment";
import { setActivePath } from "../actions/eachJobActions";
import "../less/eachJob.css";

const EachJob = ({ eachJob, history, lightMode }) => {
  let handleJobClick = () => {
    history.push(`/${eachJob.id}`);
    setActivePath();
  };

  return (
    <section
      className={!lightMode ? "each-job-container dark" : "each-job-container"}
      onClick={() => handleJobClick()}
    >
      <div className="each-job-logo-container">
        {eachJob.company_logo ? (
          <img
            src={eachJob.company_logo}
            alt={eachJob.title}
            className="each-job-logo"
          />
        ) : (
          <div className="each-job-logo-null" />
        )}
      </div>
      <div style={{ textAlign: "left" }}>
        <span className="each-job-info">
          {moment(new Date(eachJob.created_at)).fromNow()}
        </span>
        <span className="each-job-dot">&middot;</span>
        <span className="each-job-info">{eachJob.type}</span>
      </div>
      <h3 className={!lightMode ? "each-job-title dark" : "each-job-title"}>
        {eachJob.title}
      </h3>
      <div style={{ textAlign: "left" }}>
        <span className="each-job-info">{eachJob.company}</span>
      </div>
      <span className="each-job-location">{eachJob.location}</span>
    </section>
  );
};

export default EachJob;
