import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import ForecastItem, { EForecastItemTestId } from './ForecastItem';
import { locWeatherSample } from '../../constants/testSample';
import { getWeekDay } from '../../utils/getWeekDay';
import { getRoundNum } from '../../utils/getRoundNum';
import { WEATHER_STATES } from '../../constants/weather';

describe('ForecastItem', () => {
  const { consolidated_weather } = locWeatherSample;
  const onChangeCurrentWeatherIndexMock = jest.fn();
  test('should match snapshot', () => {
    const { asFragment } = render(
      <ForecastItem
        onChangeCurrentWeatherIndex={onChangeCurrentWeatherIndexMock}
        consolidatedWeather={consolidated_weather[0]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should fire event when click', () => {
    const { getByTestId } = render(
      <ForecastItem
        onChangeCurrentWeatherIndex={onChangeCurrentWeatherIndexMock}
        consolidatedWeather={consolidated_weather[0]}
      />
    );
    fireEvent(
      getByTestId(EForecastItemTestId.BUTTON),
      new MouseEvent('click', { bubbles: true, cancelable: true })
    );

    expect(onChangeCurrentWeatherIndexMock).toBeCalledTimes(1);
  });

  test('should not render', () => {
    const { asFragment } = render(
      <ForecastItem
        onChangeCurrentWeatherIndex={onChangeCurrentWeatherIndexMock}
        consolidatedWeather={undefined}
      />
    );
    expect(asFragment().firstChild).toBeNull();
  });

  test.each`
    currentWeatherIndex
    ${0}
    ${1}
    ${2}
    ${3}
    ${4}
    ${5}
  `(
    'should render data dayIndex $currentWeatherIndex correctly',
    ({ currentWeatherIndex }) => {
      const expectConsolidateWeather =
        consolidated_weather[currentWeatherIndex];
      const { getByTestId } = render(
        <ForecastItem
          onChangeCurrentWeatherIndex={onChangeCurrentWeatherIndexMock}
          consolidatedWeather={expectConsolidateWeather}
        />
      );

      const DATE = getByTestId(EForecastItemTestId.DATE);
      const WEEK_DAY = getByTestId(EForecastItemTestId.WEEK_DAY);
      const THE_TEMP = getByTestId(EForecastItemTestId.THE_TEMP);
      const MIN_TEMP = getByTestId(EForecastItemTestId.MIN_TEMP);
      const MAX_TEMP = getByTestId(EForecastItemTestId.MAX_TEMP);
      const IMAGE = getByTestId(EForecastItemTestId.IMAGE);

      expect(DATE).toHaveTextContent(expectConsolidateWeather.applicable_date);
      expect(WEEK_DAY).toHaveTextContent(
        getWeekDay(expectConsolidateWeather.applicable_date)
      );
      expect(THE_TEMP).toHaveTextContent(
        getRoundNum(expectConsolidateWeather.the_temp).toString()
      );
      expect(MIN_TEMP).toHaveTextContent(
        getRoundNum(expectConsolidateWeather.min_temp).toString()
      );
      expect(MAX_TEMP).toHaveTextContent(
        getRoundNum(expectConsolidateWeather.max_temp).toString()
      );
      expect(IMAGE).toHaveAttribute(
        'alt',
        `${WEATHER_STATES[expectConsolidateWeather.weather_state_abbr]} icon`
      );
    }
  );
});
