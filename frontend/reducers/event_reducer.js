import { RECEIVE_SINGLE_EVENT } from '../actions/event_actions';
import { merge } from 'lodash';

const EventReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_SINGLE_EVENT:
      return merge({}, action.event);
    default:
      return oldState;
  }
};

export default EventReducer;
