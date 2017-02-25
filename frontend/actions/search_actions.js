import * as Consts from '../constants/search_constants';

export const updateSearchInput = input => ({ type: Consts.UPDATE_SEARCH_VALUE, input });

export const searchRequest = (input, categories) => ({ type: Consts.SEARCH_REQUESTED, input, categories });
export const searchSuccess = () => ({ type: Consts.SEARCH_SUCCESS });
export const searchFailed = error => ({ type: Consts.SEARCH_FAILED, error });