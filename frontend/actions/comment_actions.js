import * as CommentApiUtil from '../util/comments_api_util';

import { RECEIVE_ERRORS,
  CLEAR_ERRORS } from './session_actions';

export const clearCommentErrors = errors => ({
  type: CLEAR_ERRORS,
  key: "comment",
  errors
});

export const receiveCommentErrors = errors => ({
  type: RECEIVE_ERRORS,
  key: "comment",
  errors
});
