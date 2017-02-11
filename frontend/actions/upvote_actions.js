import * as UpvotesApiUtil from '../util/upvotes_api_util';
import { requestSingleSuggestion } from './suggestion_actions';


export const createUpvote = upvote => dispatch => {
  return UpvotesApiUtil.postUpvote(upvote)
    .then(upvote => {
      dispatch(requestSingleSuggestion(upvote.idea_id));
    });
};
