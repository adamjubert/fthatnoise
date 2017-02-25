import { RECEIVE_CURRENT_USER } from '../actions/user_actions';

const defaultState = {};

const UserDetailReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      // return {
      //   ...oldState,
      //   userDetail
      // }
      return action.user.userDetail;
    default:
      return oldState;
  }
};

export default UserDetailReducer;
