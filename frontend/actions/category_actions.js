import * as CategoriesApiUtil from '../util/categories_api_util';

export const RECEIVE_ALL_CATEGORIES = "RECEIVE_ALL_CATEGORIES";

export const requestAllCategories = () => dispatch => {
  return CategoriesApiUtil.fetchAllCategories()
    .then(categories => dispatch(receiveAllCategories(categories)));
};

const receiveAllCategories = categories => ({
  type: RECEIVE_ALL_CATEGORIES,
  categories
});
