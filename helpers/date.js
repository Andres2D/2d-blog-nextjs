export const getDateFromString 
  = (date) => new Date(date.slice(0, 4), date.slice(5, 7), date.slice(8, 10));
