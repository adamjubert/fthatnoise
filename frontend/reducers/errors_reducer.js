import { RECEIVE_ERRORS,
  CLEAR_ERRORS } from '../actions/session_actions';

const defaultState = {
  session: [],
  suggestion: []
};

export const ErrorsReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case RECEIVE_ERRORS:
      newState = { [action.key]: action.errors };
      return Object.assign({}, oldState, newState);
    case CLEAR_ERRORS:
      newState = { [action.key]: [] };
      return Object.assign({}, oldState, newState);
    default:
      return oldState;
  }
};

export default ErrorsReducer;
