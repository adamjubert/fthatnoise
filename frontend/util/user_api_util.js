export const fetchCurrentUser = data => {
  return $.ajax({
    method: 'GET',
    url: 'api/users/show'
  });
};
