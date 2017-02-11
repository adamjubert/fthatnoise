import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

export const login = user => dispatch => {
  return SessionApiUtil.login(user).then(currentUser => {
    dispatch(receiveCurrentUser(currentUser));
    dispatch(clearSessionErrors());
    return currentUser;
  }, err => {
    dispatch(receiveSessionErrors(err.responseJSON));
  });
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(() => {
    dispatch(receiveCurrentUser(null));
    return null;
  });
};

export const signup = user => dispatch => {
  return SessionApiUtil.signup(user).then(currentUser => {
    dispatch(receiveCurrentUser(currentUser));
    dispatch(clearSessionErrors());
    return currentUser;
  }, err => {
    dispatch(receiveSessionErrors(err.responseJSON));
  });
};

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});
