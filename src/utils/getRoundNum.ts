export const getRoundUp = (num: number): number => {
  return !num ? 0 : Math.ceil(num);
};
