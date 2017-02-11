import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const defaultState = {
  currentUser: null
};

const SessionReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      newState = { currentUser: action.currentUser };
      return Object.assign({}, newState);
    default:
      return oldState;
  }
};

export default SessionReducer;
