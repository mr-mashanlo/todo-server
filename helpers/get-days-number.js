export const getWeekdayNumber = () => {
  const week = [ 0, 1, 2, 3, 4, 5, 6 ];
  const today = new Date().getDay();
  const before = week.slice( 0, today );
  const after = week.slice( today );

  return [ ...after, ...before ];
};