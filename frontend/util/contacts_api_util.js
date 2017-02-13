export const createContact = contact => {
  return $.ajax({
    method: 'POST',
    url: '/api/contacts',
    data: { contact }
  });
};
