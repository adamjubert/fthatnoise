import { RECEIVE_ALL_SUGGESTIONS } from '../actions/suggestion_actions';
import { merge } from 'lodash';

const SuggestionsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_ALL_SUGGESTIONS:
      return merge({}, action.suggestions);
    default:
      return oldState;
  }
};

export default SuggestionsReducer;
