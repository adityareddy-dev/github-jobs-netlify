import React from "react";
import Switch from "react-switch";
import { connect } from "react-redux";
import { toggleLightDarkMode } from "../actions/headerActions.js";
import "../less/header.css";

class Header extends React.Component {
  constructor() {
    super();
    this.state = { checked: false };
  }

  handleChange = () => {
    console.log(!this.props.lightMode);
    this.props.toggleLightDarkMode(!this.props.lightMode);
  };

  handleLogoClick = (event) => {
    event.preventDefault();
    window.location.href = "/";
  };

  render() {
    console.log(this.props);
    return (
      <div className={!this.props.lightMode ? "header dark" : "header"}>
        <div className="header-inner-container container-fluid">
          <div className="header-main-row row">
            <div className="col-2"></div>
            <div
              className="col-1 header-title"
              onClick={(event) => {
                this.handleLogoClick(event);
              }}
            >
              devjobs
            </div>
            <div className="col-6"></div>
            <div className="col-1 header-toggle">
              <i className="fa fa-sun-o" aria-hidden="true"></i>
              &nbsp;
              <Switch
                onChange={this.handleChange}
                checked={!this.props.lightMode}
              />
              &nbsp;
              <i className="fa fa-moon-o" aria-hidden="true"></i>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lightMode: state.headerReducer.lightMode,
  };
};

const mapDispatchToProps = (dispatch) => ({
  toggleLightDarkMode: (value) => dispatch(toggleLightDarkMode(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
