import React from 'react';
import { connect } from 'react-redux';
import App from './app';
import EventMapContainer from '../events/event_map_container';
import SessionFormContainer from '../session/session_form_container';

const EventMap = props => {
  return <EventMapContainer { ...props } />;
};

const SignupForm = props => {
  return <SessionFormContainer { ...props } formType="signup" />;
};

const LoginForm = props => {
  return <SessionFormContainer { ...props } formType="login" />;
};

const modals = {
  map: props => EventMap(props),
  login: props => LoginForm(props),
  signup: props => SignupForm(props)
};

const mapStateToProps = state => {
  const modal = state.modal ? modals[state.modal]() : null;

  return {
    modal,
    modalType: state.modal
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
