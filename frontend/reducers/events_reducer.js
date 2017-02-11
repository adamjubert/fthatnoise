import { RECEIVE_ALL_EVENTS } from '../actions/event_actions';
import { merge } from 'lodash';

const EventsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_ALL_EVENTS:
      return action.events;
    default:
      return oldState;
  }
};

export default EventsReducer;
