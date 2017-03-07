/**
 * @param {Array} oldState - The old suggestions array, pre-filter
 * @param {Object} action - The action object passed into the suggestions/events reducer by our action creator
 * @returns {Array} The new suggestions array, filtered
 */
export const filterBySearch = (oldState, action) => {
  let searchArr = separateCategoriesFromQuery(action.input, action.categories);
  let titleQuery = searchArr[0];
  let categoryQuery = searchArr[1];

  let filteredByCategory = null;

  if (categoryQuery.length) {

    filteredByCategory = oldState.filter(item => {
      for (let i = 0; i < categoryQuery.length; i++) {
        let categoryId = categoryQuery[i];
        if (item.categories && item.categories[categoryId]) { // checking for item.categories is protection against items without tags
          return true;
        }
      }
    });

  } else {
    filteredByCategory = oldState;
  }
  

  if (titleQuery === '') { // if they are only searching by categories, then don't even try filtering by name
    return filteredByCategory;
  }

  let filteredByName = filteredByCategory.filter(item => {
    let title = item.title.toLowerCase();
    
    return title.indexOf(titleQuery) > -1;
  });

  return filteredByName;
}

/**
 * @param {String} input - the raw search string
 * @param {Array} categoriesArr - An array containing all categories
 * @returns {Array} An array with the 1st element being just the search query, and the 2nd element the categories found in the search string
 */
export const separateCategoriesFromQuery = (input, categoriesArr) => {
  const categoriesFound = [];

  input = input.toLowerCase();

  categoriesArr.forEach(categoryObj => {
    let lowerCaseCategoryName = categoryObj.name.toLowerCase();

    if (input.indexOf(lowerCaseCategoryName) > -1) {
      categoriesFound.push(categoryObj.id);
      input = input.replace(lowerCaseCategoryName, '');
    }
  });
  
  return [trimWhitespace(input), categoriesFound];
}

// Trims leading and trailing whitespace
export const trimWhitespace = (str) => {
  return str.replace(/^\s+|\s+$/g, '');
}
