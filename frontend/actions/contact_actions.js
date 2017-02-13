import * as ContactApiUtil from '../util/contacts_api_util';
import { RECEIVE_ERRORS,
  CLEAR_ERRORS } from './session_actions';

export const createContact = contact => dispatch => {
  return ContactApiUtil.createContact(contact).then(newContact => {
    dispatch(clearContactErrors());
    return newContact;
  },
  err => dispatch(receiveContactErrors(err.responseJSON)));
};

const clearContactErrors = () => ({
  type: CLEAR_ERRORS,
  key: "contact"
});

const receiveContactErrors = errors => ({
  type: RECEIVE_ERRORS,
  key: "contact",
  errors
});
