import { RECEIVE_SINGLE_SUGGESTION } from '../actions/suggestion_actions';
import { merge } from 'lodash';

const SuggestionReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_SINGLE_SUGGESTION:
      return merge({}, action.suggestion);
    default:
      return oldState;
  }
};

export default SuggestionReducer;
