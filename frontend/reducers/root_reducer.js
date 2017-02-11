import { combineReducers } from 'redux';

import suggestions from './suggestions_reducer';
import suggestion from './suggestion_reducer';
import events from './events_reducer';
import event from './event_reducer';

export default combineReducers({
  suggestions,
  suggestion,
  events,
  event
});
