import React from 'react';
import { connect } from 'react-redux';
import App from './app';
import EventMapContainer from '../events/event_map_container';

const EventMap = props => {
  return <EventMapContainer { ...props } />;
};

const modals = {
  map: props => EventMap(props)
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
