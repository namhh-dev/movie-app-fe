export const validateLink = (url) => /^(ftp|http|https):\/\/[^ "]+$/.test(url);

export const validateEpisodeFormInputs = (data, setErrorMessage) => {
  const fields = [
    { field: 'filename', message: 'Title không được bỏ trống' },
    { field: 'name', message: 'Name không được bỏ trống' },
    { field: 'slug', message: 'Slug không được bỏ trống' },
    { field: 'link_embed', message: 'Link không hợp lệ', validate: validateLink }
  ];

  for (const { field, message, validate } of fields) {
    if (!data[field] || (validate && !validate(data[field]))) {
      setErrorMessage(message);
      return false;
    }
  }
  return true;
};
