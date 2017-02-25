// takes rawSearchString and the categories array as arguments
// returns the string without any tags, and an array with categories found in the string
export const parseSearchInput = (input, categoriesArr) => {
  const categoriesFound = [];

  input = input.toLowerCase();

  categoriesArr.forEach(categoryObj => {
    if (input.indexOf(categoryObj.name.toLowerCase()) > -1) {
      categoriesFound.push(categoryObj.id);
      input = input.replace(categoryObj.name.toLowerCase(), '');
    }
  });
  return [trimWhitespace(input).toLowerCase(), categoriesFound];
}

// Trims leading and trailing whitespace
export const trimWhitespace = (str) => {
  return str.replace(/^\s+|\s+$/g, '');
}

