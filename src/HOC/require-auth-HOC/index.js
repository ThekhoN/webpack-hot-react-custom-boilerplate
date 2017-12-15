import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";

const requireAuthHOC = ComposedComponent => {
  class RequireAuthHOC extends Component {
    render() {
        const {user} = this.props;
        if(!user) {
            return <Redirect to="/login" />
        } else {
            return (<ComposedComponent />)
        }
    }
  };

  const mapStateToProps = state => ({
      user: state.auth.user
  });
  return connect(mapStateToProps, null)(RequireAuthHOC);
};

export default requireAuthHOC;


