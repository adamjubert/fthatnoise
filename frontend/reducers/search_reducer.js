import * as Consts from '../constants/search_constants';

const initialState = {
  input: '',
  isFetching: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Consts.UPDATE_SEARCH_VALUE:
      return Object.assign({}, state, {
        input: action.input
      });
    case Consts.SEARCH_REQUESTED:
      return Object.assign({}, state, {
        input: '',
        isFetching: true
      });
    case Consts.SEARCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      });
    case Consts.SEARCH_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}