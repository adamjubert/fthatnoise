import { combineReducers } from 'redux';

import suggestions from './suggestions_reducer';
import suggestion from './suggestion_reducer';

export default combineReducers({
  suggestions,
  suggestion
});
