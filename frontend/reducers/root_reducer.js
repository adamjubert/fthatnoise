import { combineReducers } from 'redux';

import suggestions from './suggestions_reducer';
import suggestion from './suggestion_reducer';
import events from './events_reducer';
import event from './event_reducer';
import session from './session_reducer';
import errors from './errors_reducer';

export default combineReducers({
  session,
  suggestions,
  suggestion,
  events,
  event,
  errors
});
