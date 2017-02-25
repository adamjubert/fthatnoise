import { combineReducers } from 'redux';

import suggestions from './suggestions_reducer';
import suggestion from './suggestion_reducer';
import events from './events_reducer';
import event from './event_reducer';
import session from './session_reducer';
import errors from './errors_reducer';
import categories from './categories_reducer';
import userDetail from './users_reducer';
import search from './search_reducer';

export default combineReducers({
  session,
  suggestions,
  suggestion,
  events,
  event,
  errors,
  categories,
  userDetail,
  search
});
