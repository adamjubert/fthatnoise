import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const login = user => dispatch => {
  return SessionApiUtil.login(user).then(currentUser => {
    dispatch(receiveCurrentUser(currentUser));
    dispatch(clearSessionErrors());
    return currentUser;
  }, err => {
    dispatch(receiveSessionErrors(err.responseJSON));
  });
};

export const logout = () => dispatch => (
  SessionApiUtil.logout().then(user => dispatch(receiveCurrentUser(null)))
);

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
  type: RECEIVE_ERRORS,
  key: "session",
  errors
});

export const clearSessionErrors = () => ({
  type: CLEAR_ERRORS,
  key: "session"
});
