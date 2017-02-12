import { RECEIVE_ALL_CATEGORIES } from '../actions/category_actions';

const CategoriesRecuer = (oldState = [], action) => {
  switch(action.type) {
    case RECEIVE_ALL_CATEGORIES:
      return action.categories;
    default: return oldState;
  }
};

export default CategoriesRecuer;
