import { RECEIVE_ALL_EVENTS,
  RECEIVE_SINGLE_EVENT,
  REMOVE_SINGLE_EVENT } from '../actions/event_actions';
import { RECEIVE_CURRENT_USER } from '../actions/user_actions';
import { merge } from 'lodash';

const EventsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case RECEIVE_ALL_EVENTS:
      return action.events;
    case RECEIVE_CURRENT_USER:
      return action.user.events;
    case RECEIVE_SINGLE_EVENT:
      newState = oldState.slice();
      for (let i = 0; i < newState.length; i++) {
        if (action.event.id === newState[i].id) {
          newState[i] = action.event;
          break;
        }
      }
      return newState;
    case REMOVE_SINGLE_EVENT:
      newState = oldState.slice();
      let index;

      for (let i = 0; i < newState.length; i++) {
        if (action.event.id === newState[i].id) {
          index = i;
          break;
        }
      }

      if (index || index === 0) {
        newState.splice(index, 1);
        return newState;
      } else {
        return newState;
      }
    default:
      return oldState;
  }
};

export default EventsReducer;
