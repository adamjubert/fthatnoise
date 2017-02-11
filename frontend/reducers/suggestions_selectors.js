import { values } from 'lodash';

export const selectAllSuggestions = ({ suggestions }) => values(suggestions);
