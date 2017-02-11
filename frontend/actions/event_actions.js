import * as EventsApiUtil from '../util/events_api_util';

export const RECEIVE_ALL_EVENTS = "RECEIVE_ALL_EVENTS";
export const RECEIVE_SINGLE_EVENT = "RECEIVE_SINGLE_EVENT";

export const requestAllEvents = () => dispatch => {
  return EventsApiUtil.fetchAllEvents()
    .then(events => dispatch(receiveAllEvents(events)));
};

export const requestSingleEvent = id => dispatch => {
  return EventsApiUtil.fetchSingleEvent(id)
    .then(event => {
      dispatch(receiveSingleEvent(event));
    }
  );
};

export const receiveAllEvents = events => ({
  type: RECEIVE_ALL_EVENTS,
  events
});

export const receiveSingleEvent = event => ({
  type: RECEIVE_SINGLE_EVENT,
  event
});
