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

export const postSuggestion = suggestion => {
  return $.ajax({
    method: 'POST',
    url: 'api/suggestions',
    data: { suggestion }
  });
};

export const updateSuggestion = suggestion => {
  return $.ajax({
    method: 'PATCH',
    url: `api/suggestions/${suggestion.id}`,
    data: { suggestion }
  });
};
