export const fetchAllEvents = data => {
  return $.ajax({
    method: 'GET',
    url: '/api/events',
    data: data
  });
};

export const fetchSingleEvent = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/events/${id}`
  });
};

export const postEvent = event => {
  return $.ajax({
    method: 'POST',
    url: '/api/events',
    data: { event }
  });
};

export const updateEvent = event => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/events/${event.id}`,
    data: { event }
  });
};

export const pendingUpvoteEvent = id => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/events/${id}/pending_upvote`
  });
};

export const ignoreUpvoteEvent = id => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/events/${id}/ignore_upvote`
  });
};

export const completeUpvoteEvent = id => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/events/${id}/complete_upvote`
  });
};
