export const fetchAllEvents = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/events'
  });
};

export const fetchSingleEvent = id => {
  return $.ajax({
    method: 'GET',
    url: `api/events/${id}`
  });
};
