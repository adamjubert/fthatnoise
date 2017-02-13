import { RECEIVE_ERRORS,
  CLEAR_ERRORS } from '../actions/session_actions';
import { CLEAR_ALL_ERRORS } from '../actions/error_actions';

const defaultState = {
  session: [],
  suggestion: [],
  event: [],
  comment: [],
  contact: []
};

const ErrorsReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;
  switch(action.type) {
    case RECEIVE_ERRORS:
      newState = { [action.key]: action.errors };
      return Object.assign({}, oldState, newState);
    case CLEAR_ERRORS:
      newState = { [action.key]: [] };
      return Object.assign({}, oldState, newState);
    case CLEAR_ALL_ERRORS:
      return defaultState;
    default:
      return oldState;
  }
};

export default ErrorsReducer;
