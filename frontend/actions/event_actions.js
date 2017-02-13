import * as EventsApiUtil from '../util/events_api_util';
import * as CommentApiUtil from '../util/comments_api_util';
import { RECEIVE_ERRORS,
  CLEAR_ERRORS } from './session_actions';
import { clearCommentErrors, receiveCommentErrors } from './comment_actions';

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

export const createEventComment = comment => dispatch => {
  return CommentApiUtil.createComment(comment).then(idea => {
    dispatch(receiveSingleEvent(idea));
    dispatch(clearCommentErrors());
    return idea;
  },
    err => dispatch(receiveCommentErrors(err.responseJSON)));
};

export const pendingUpvoteEvent = event => dispatch => {
  return EventsApiUtil.pendingUpvoteEvent(event.id)
    .then(updatedEvent => {
      dispatch(receiveSingleEvent(updatedEvent));
      return updatedEvent;
    });
};

export const ignoreUpvoteEvent = event => dispatch => {
  return EventsApiUtil.ignoreUpvoteEvent(event.id)
    .then(updatedEvent => {
      dispatch(receiveSingleEvent(updatedEvent));
      return updatedEvent;
    });
};

export const completeUpvoteEvent = event => dispatch => {
  return EventsApiUtil.completeUpvoteEvent(event.id)
    .then(updatedEvent => {
      dispatch(receiveSingleEvent(updatedEvent));
      return updatedEvent;
    });
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

export const clearEventErrors = () => ({
  type: CLEAR_ERRORS,
  key: "event"
});
