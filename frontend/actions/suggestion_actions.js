import * as SuggestionsApiUtil from '../util/suggestions_api_util';
import * as CommentApiUtil from '../util/comments_api_util';
import { RECEIVE_ERRORS,
  CLEAR_ERRORS } from './session_actions';
import { clearCommentErrors, receiveCommentErrors } from './comment_actions';

export const RECEIVE_ALL_SUGGESTIONS = "RECEIVE_ALL_SUGGESTIONS";
export const RECEIVE_SINGLE_SUGGESTION = "RECEIVE_SINGLE_SUGGESTION";
export const REMOVE_SINGLE_SUGGESTION = "REMOVE_SINGLE_SUGGESTION";

export const requestAllSuggestions = data => dispatch => {
  return SuggestionsApiUtil.fetchAllSuggestions(data)
    .then(suggestions => {
      dispatch(receiveAllSuggestions(suggestions));
      return suggestions;
    }
  );
};

export const requestSingleSuggestion = id => dispatch => {
  return SuggestionsApiUtil.fetchSingleSuggestion(id)
    .then(suggestion => {
      dispatch(receiveSingleSuggestion(suggestion));
      return suggestion;
    }
  );
};

export const createSuggestion = suggestion => dispatch => {
  return SuggestionsApiUtil.postSuggestion(suggestion)
    .then(newSuggestion => {
      dispatch(receiveSingleSuggestion(newSuggestion));
      dispatch(clearSuggestionErrors());
      return newSuggestion;
    },
      err => dispatch(receiveSuggestionErrors(err.responseJSON)));
};

export const updateSuggestion = suggestion => dispatch => {
  return SuggestionsApiUtil.updateSuggestion(suggestion)
    .then(updatedSuggestion => {
      dispatch(receiveSingleSuggestion(updatedSuggestion));
      dispatch(clearSuggestionErrors());
      return updatedSuggestion;
    },
      err => dispatch(receiveSuggestionErrors(err.responseJSON)));
};

export const createSuggestionComment = comment => dispatch => {
  return CommentApiUtil.createComment(comment).then(idea => {
    dispatch(receiveSingleSuggestion(idea));
    dispatch(clearCommentErrors());
    return idea;
  },
    err => dispatch(receiveCommentErrors(err.responseJSON)));
};

export const pendingUpvoteSuggestion = suggestion => dispatch => {
  return SuggestionsApiUtil.pendingUpvoteSuggestion(suggestion.id)
    .then(updatedSuggestion => {
      dispatch(receiveSingleSuggestion(updatedSuggestion));
      return updatedSuggestion;
    });
};

export const ignoreUpvoteSuggestion = suggestion => dispatch => {
  return SuggestionsApiUtil.ignoreUpvoteSuggestion(suggestion.id)
    .then(updatedSuggestion => {
      dispatch(receiveSingleSuggestion(updatedSuggestion));
      return updatedSuggestion;
    });
};

export const completeUpvoteSuggestion = suggestion => dispatch => {
  return SuggestionsApiUtil.completeUpvoteSuggestion(suggestion.id)
    .then(updatedSuggestion => {
      dispatch(receiveSingleSuggestion(updatedSuggestion));
      return updatedSuggestion;
    });
};

export const receiveAllSuggestions = suggestions => ({
  type: RECEIVE_ALL_SUGGESTIONS,
  suggestions
});

export const receiveSingleSuggestion = suggestion => ({
  type: RECEIVE_SINGLE_SUGGESTION,
  suggestion
});

export const removeSingleSuggestion = suggestion => ({
  type: REMOVE_SINGLE_SUGGESTION,
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
