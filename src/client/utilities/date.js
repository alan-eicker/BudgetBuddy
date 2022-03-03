export const formatDate = (dateStr) => {
  const dateStrParts = dateStr.split('-');
  const dateStrYear = dateStrParts.shift();
  return [...dateStrParts, dateStrYear].join('/');
};
