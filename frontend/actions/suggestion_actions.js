import * as SuggestionApiUtil from '../util/suggestions_api_util';

export const RECEIVE_ALL_SUGGESTIONS = "RECEIVE_ALL_SUGGESTIONS";
export const RECEIVE_SINGLE_SUGGESTION = "RECEIVE_SINGLE_SUGGESTION";

export const requestAllSuggestions = () => dispatch => {
  return SuggestionApiUtil.fetchAllSuggestions()
    .then(suggestions => dispatch(receiveAllSuggestions(suggestions)));
};

export const requestSingleSuggestion = id => dispatch => {
  return SuggestionApiUtil.fetchSingleSuggestion(id)
    .then(suggestion => {
      dispatch(receiveSingleSuggestion(suggestion));
    }
  );
};

export const receiveAllSuggestions = suggestions => ({
  type: RECEIVE_ALL_SUGGESTIONS,
  suggestions
});

export const receiveSingleSuggestion = suggestion => ({
  type: RECEIVE_SINGLE_SUGGESTION,
  suggestion
});
