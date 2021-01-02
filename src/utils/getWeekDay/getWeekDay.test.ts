import { getWeekDay } from './getWeekDay';

describe('getWeekDay', () => {
  test.each`
    input              | expectedResult
    ${''}              | ${''}
    ${'I am a string'} | ${''}
    ${'$$'}            | ${''}
    ${null}            | ${''}
    ${undefined}       | ${''}
    ${true}            | ${''}
    ${false}           | ${''}
    ${1234}            | ${'Thursday'}
    ${'1234'}          | ${'Sunday'}
    ${'2021-01-01'}    | ${'Friday'}
    ${'2021-01-02'}    | ${'Staturday'}
    ${'2021-01-03'}    | ${'Sunday'}
    ${'2021-01-04'}    | ${'Monday'}
    ${'2021-01-05'}    | ${'Tuesday'}
    ${'2021-01-06'}    | ${'Wednesday'}
    ${'2021-01-07'}    | ${'Thursday'}
  `(
    "getWeekday('$input') should return '$expectedResult'",
    ({ input, expectedResult }) => {
      const actual = getWeekDay(input);
      expect(actual).toEqual(expectedResult);
    }
  );
});
