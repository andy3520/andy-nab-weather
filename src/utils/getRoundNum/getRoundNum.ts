export const getRoundNum = (num: number): number => {
  // eslint-disable-next-line no-restricted-globals
  if (typeof num !== 'number' || isNaN(num)) return 0;

  return Math.round(num);
};
