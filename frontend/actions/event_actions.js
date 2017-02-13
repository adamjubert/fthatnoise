import * as EventsApiUtil from '../util/events_api_util';
import { RECEIVE_ERRORS,
  CLEAR_ERRORS } from './session_actions';

export const RECEIVE_ALL_EVENTS = "RECEIVE_ALL_EVENTS";
export const RECEIVE_SINGLE_EVENT = "RECEIVE_SINGLE_EVENT";

export const requestAllEvents = () => dispatch => {
  return EventsApiUtil.fetchAllEvents()
    .then(events => {
      dispatch(receiveAllEvents(events));
      return events;
    }
  );
};

export const requestSingleEvent = id => dispatch => {
  return EventsApiUtil.fetchSingleEvent(id)
    .then(event => {
      dispatch(receiveSingleEvent(event));
      return event;
    }
  );
};

export const createEvent = event => dispatch => {
  return EventsApiUtil.postEvent(event)
    .then(newEvent => {
      dispatch(receiveSingleEvent(newEvent));
      dispatch(clearEventErrors());
      return newEvent;
    },
      err => dispatch(receiveEventErrors(err.responseJSON)));
};

export const updateEvent = event => dispatch => {
  return EventsApiUtil.updateEvent(event)
    .then(updatedEvent => {
      dispatch(receiveSingleEvent(updatedEvent));
      dispatch(clearEventErrors());
      return updatedEvent;
    },
      err => dispatch(receiveEventErrors(err.responseJSON)));
};

export const receiveAllEvents = events => ({
  type: RECEIVE_ALL_EVENTS,
  events
});

export const receiveSingleEvent = event => ({
  type: RECEIVE_SINGLE_EVENT,
  event
});

export const receiveEventErrors = errors => ({
  type: RECEIVE_ERRORS,
  key: "event",
  errors
});

export const clearEventErrors = errors => ({
  type: CLEAR_ERRORS,
  key: "event",
  errors
});
