import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_DETAIL";

export const requestCurrentUser = data => dispatch => {
  return UserApiUtil.fetchCurrentUser(data).then(user => {
    dispatch(receiveCurrentUser(user));
    return user;
  });
};

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});
