import * as SuggestionsApiUtil from '../util/suggestions_api_util';
import { RECEIVE_ERRORS,
  CLEAR_ERRORS } from './session_actions';

export const RECEIVE_ALL_SUGGESTIONS = "RECEIVE_ALL_SUGGESTIONS";
export const RECEIVE_SINGLE_SUGGESTION = "RECEIVE_SINGLE_SUGGESTION";
export const RECEIVE_SUGGESTION_ERRORS = "RECEIVE_SUGGESTION_ERRORS";
export const CLEAR_SUGGESTION_ERRORS = "CLEAR_SUGGESTION_ERRORS";

export const requestAllSuggestions = () => dispatch => {
  return SuggestionsApiUtil.fetchAllSuggestions()
    .then(suggestions => dispatch(receiveAllSuggestions(suggestions)));
};

export const requestSingleSuggestion = id => dispatch => {
  return SuggestionsApiUtil.fetchSingleSuggestion(id)
    .then(suggestion => {
      dispatch(receiveSingleSuggestion(suggestion));
    }
  );
};

export const createSuggestion = suggestion => dispatch => {
  return SuggestionsApiUtil.postSuggestion(suggestion)
    .then(newSuggestion => {
      dispatch(receiveSingleSuggestion(newSuggestion));
      dispatch(clearSuggestionErrors());
      return suggestion;
    },
      err => dispatch(receiveSuggestionErrors(err.responseJSON)));
};

export const updateSuggestion = suggestion => dispatch => {
  return SuggestionsApiUtil.updateSuggestion(suggestion)
    .then(updatedSuggestion => {
      dispatch(receiveSingleSuggestion(updatedSuggestion));
      dispatch(clearSuggestionErrors());
      return suggestion;
    },
      err => dispatch(receiveSuggestionErrors(err.responseJSON)));
};

export const receiveAllSuggestions = suggestions => ({
  type: RECEIVE_ALL_SUGGESTIONS,
  suggestions
});

export const receiveSingleSuggestion = suggestion => ({
  type: RECEIVE_SINGLE_SUGGESTION,
  suggestion
});

export const receiveSuggestionErrors = errors => ({
  type: RECEIVE_ERRORS,
  key: "suggestion",
  errors
});

export const clearSuggestionErrors = () => ({
  type: CLEAR_ERRORS,
  key: "suggestion"
});
