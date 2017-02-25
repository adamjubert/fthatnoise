import { RECEIVE_ALL_SUGGESTIONS,
RECEIVE_SINGLE_SUGGESTION } from '../actions/suggestion_actions';
import { RECEIVE_CURRENT_USER } from '../actions/user_actions';
// import { merge } from 'lodash';

const SuggestionsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case RECEIVE_ALL_SUGGESTIONS:
      return action.suggestions;
    case RECEIVE_CURRENT_USER:
      return action.user.suggestions;
    case RECEIVE_SINGLE_SUGGESTION:
      newState = oldState.slice();
      for (let i = 0; i < newState.length; i++) {
        if (action.suggestion.id === newState[i].id) {
          newState[i] = action.suggestion;
          break;
        }
      }
      return newState;
    default:
      return oldState;
  }
};

export default SuggestionsReducer;
