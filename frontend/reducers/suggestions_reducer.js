import { RECEIVE_ALL_SUGGESTIONS,
RECEIVE_SINGLE_SUGGESTION } from '../actions/suggestion_actions';
// import { merge } from 'lodash';

const SuggestionsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case RECEIVE_ALL_SUGGESTIONS:
      return action.suggestions;
    case RECEIVE_SINGLE_SUGGESTION:
      newState = [action.suggestion];
      newState.concat(oldState);
      return newState;
    default:
      return oldState;
  }
};

export default SuggestionsReducer;
