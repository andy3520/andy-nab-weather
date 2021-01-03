import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ForecastCard, { EForecastCardTestId } from './ForecastCard';
import { locWeatherSample } from '../../constants/testSample';
import { getWeekDay } from '../../utils/getWeekDay';
import { getRoundNum } from '../../utils/getRoundNum';
import { WEATHER_STATES } from '../../constants/weather';

describe('ForecastCard', () => {
  const weather = locWeatherSample;

  test('should match snapshot', () => {
    const currentWeatherIndex = 0;
    const { asFragment } = render(
      <ForecastCard
        currentWeatherIndex={currentWeatherIndex}
        weather={weather}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should not render', () => {
    const { asFragment } = render(
      <ForecastCard currentWeatherIndex={0} weather={undefined} />
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
      const expectedTitle = `${weather.title} Weather`;
      const expectCardWeather =
        weather.consolidated_weather[currentWeatherIndex];
      const { getByTestId } = render(
        <ForecastCard
          currentWeatherIndex={currentWeatherIndex}
          weather={weather}
        />
      );

      const TITLE = getByTestId(EForecastCardTestId.TITLE);
      const DATE = getByTestId(EForecastCardTestId.DATE);
      const WEEK_DAY = getByTestId(EForecastCardTestId.WEEK_DAY);
      const THE_TEMP = getByTestId(EForecastCardTestId.THE_TEMP);
      const MIN_TEMP = getByTestId(EForecastCardTestId.MIN_TEMP);
      const MAX_TEMP = getByTestId(EForecastCardTestId.MAX_TEMP);
      const IMAGE = getByTestId(EForecastCardTestId.IMAGE);

      expect(TITLE).toHaveTextContent(expectedTitle);
      expect(DATE).toHaveTextContent(expectCardWeather.applicable_date);
      expect(WEEK_DAY).toHaveTextContent(
        getWeekDay(expectCardWeather.applicable_date)
      );
      expect(THE_TEMP).toHaveTextContent(
        getRoundNum(expectCardWeather.the_temp).toString()
      );
      expect(MIN_TEMP).toHaveTextContent(
        getRoundNum(expectCardWeather.min_temp).toString()
      );
      expect(MAX_TEMP).toHaveTextContent(
        getRoundNum(expectCardWeather.max_temp).toString()
      );
      expect(IMAGE).toHaveAttribute(
        'alt',
        `${WEATHER_STATES[expectCardWeather.weather_state_abbr]} icon`
      );
    }
  );
});
