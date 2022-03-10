export const formatDate = (dateStr) => {
  const dateStrParts = dateStr.split('-');
  const dateStrYear = dateStrParts.shift();
  return [...dateStrParts, dateStrYear].join('/');
};

export const getDaysPastDue = (date) => {
  const now = new Date();
  const dueDate = new Date(date);
  const timeDifference = Math.abs(now - dueDate);
  const isPastDue = now > dueDate;
  const daysOverdue = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return { isPastDue, daysOverdue };
};
