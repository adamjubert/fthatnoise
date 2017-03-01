import { RECEIVE_ALL_SUGGESTIONS,
  RECEIVE_SINGLE_SUGGESTION,
  REMOVE_SINGLE_SUGGESTION } from '../actions/suggestion_actions';
import { RECEIVE_CURRENT_USER } from '../actions/user_actions';
import { SEARCH_REQUESTED } from '../constants/search_constants';
import { parseSearchInput } from '../util/search_input_parse_util';

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

    case SEARCH_REQUESTED:
      let searchArr = parseSearchInput(action.input, action.categories);
      let flag = false;

      // searchArr is an array with the first element being the title search request
      // and the second element being the categoryIds found in the search input

      // ofc I will refactor the below code
      return oldState.filter(suggestion => {
        for (let i = 0; i < searchArr[1].length; i++) {
          let searchInputCatId = searchArr[1][i];
          if (suggestion.categories && suggestion.categories[searchInputCatId]) {
            flag = true;
            return true;
          }
        }

        let title = suggestion.title.toLowerCase();

        if (title.indexOf(searchArr[0]) > -1 && flag === false) {
          return true;
        }

        return false;
      });
    case REMOVE_SINGLE_SUGGESTION:
      newState = oldState.slice();
      let index;

      for (let i = 0; i < newState.length; i++) {
        if (action.suggestion.id === newState[i].id) {
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

export default SuggestionsReducer;
