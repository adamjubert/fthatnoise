export const fetchAllSuggestions = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/suggestions'
  });
};

export const fetchSingleSuggestion = id => {
  return $.ajax({
    method: 'GET',
    url: `api/suggestions/${id}`
  });
};
