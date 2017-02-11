import { RECEIVE_SESSION_ERRORS,
  CLEAR_SESSION_ERRORS } from '../actions/session_actions';

const defaultState = {
  session: []
};

export const ErrorsReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      newState = { session: action.errors };
      return Object.assign({}, oldState, newState);
    case CLEAR_SESSION_ERRORS:
      newState = { session: [] };
      return Object.assign({}, oldState, newState);
    default:
      return oldState;
  }
};

export default ErrorsReducer;
