export const fetchCurrentUser = data => {
  return $.ajax({
    method: 'GET',
    url: 'api/profile',
    data: data
  });
};

export const fetchUserShow = userId => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${userId}`
  });
};
