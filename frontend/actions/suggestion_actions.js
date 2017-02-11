import * as SuggestionApiUtil from '../util/suggestions_api_util';
import { RECEIVE_ERRORS,
  CLEAR_ERRORS } from './session_actions';

export const RECEIVE_ALL_SUGGESTIONS = "RECEIVE_ALL_SUGGESTIONS";
export const RECEIVE_SINGLE_SUGGESTION = "RECEIVE_SINGLE_SUGGESTION";
export const RECEIVE_SUGGESTION_ERRORS = "RECEIVE_SUGGESTION_ERRORS";
export const CLEAR_SUGGESTION_ERRORS = "CLEAR_SUGGESTION_ERRORS";

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

export const createSuggestion = suggestion => dispatch => {
  return SuggestionApiUtil.postSuggestion(suggestion)
    .then(suggestion => {
      dispatch(receiveSingleSuggestion(suggestion));
      dispatch(clearSuggestionErrors());
      return suggestion;
    },
      err => dispatch(receiveSuggestionErrors(err.responseJSON)));
};

export const updateSuggestion = suggestion => dispatch => {
  return SuggestionApiUtil.updateSuggestion(suggestion)
    .then(suggestion => {
      dispatch(receiveSingleSuggestion(suggestion));
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
