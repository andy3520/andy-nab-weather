import { getRoundNum } from './getRoundNum';

describe('getRoundNum', () => {
  test.each`
    input              | expectedResult
    ${''}              | ${0}
    ${'I am a string'} | ${0}
    ${undefined}       | ${0}
    ${null}            | ${0}
    ${true}            | ${0}
    ${false}           | ${0}
    ${0}               | ${0}
    ${1.000000001}     | ${1}
    ${1.499999}        | ${1}
    ${1.5}             | ${2}
    ${1.500001}        | ${2}
  `(
    'getRoundNum($input) should return $expectedResult',
    ({ input, expectedResult }) => {
      const actual = getRoundNum(input);
      expect(actual).toEqual(expectedResult);
    }
  );
});
