import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import ForecastList, { EForecastListTestId } from './ForecastList';
import { locWeatherSample } from '../../constants/testSample';
import { EForecastItemTestId } from '../ForecastItem/ForecastItem';

describe('ForecastList', () => {
  const weather = locWeatherSample;
  const setCurrentWeatherIndexMock = jest.fn();
  test('should match snapshot', () => {
    const { asFragment } = render(
      <ForecastList
        weather={weather}
        setCurrentWeatherIndex={setCurrentWeatherIndexMock}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should not render', () => {
    const { asFragment } = render(
      <ForecastList
        weather={undefined}
        setCurrentWeatherIndex={setCurrentWeatherIndexMock}
      />
    );
    expect(asFragment().firstChild).toBeNull();
  });

  test('should render all weather forecast items', () => {
    const { getAllByTestId } = render(
      <ForecastList
        weather={weather}
        setCurrentWeatherIndex={setCurrentWeatherIndexMock}
      />
    );
    const items = getAllByTestId(EForecastListTestId.ITEM);

    expect(items).toHaveLength(weather.consolidated_weather.length);
  });

  test('should fire event when click', () => {
    const { getAllByTestId } = render(
      <ForecastList
        weather={weather}
        setCurrentWeatherIndex={setCurrentWeatherIndexMock}
      />
    );

    const items = getAllByTestId(EForecastItemTestId.BUTTON);
    fireEvent(
      items[0],
      new MouseEvent('click', { bubbles: true, cancelable: true })
    );
    expect(setCurrentWeatherIndexMock).toBeCalledTimes(1);
  });
});
