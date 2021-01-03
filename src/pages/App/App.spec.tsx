import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import _fetch from 'isomorphic-fetch';
import _fetchMock from 'fetch-mock';
import {
  ipLocSample,
  locSample,
  locWeatherSample,
} from '../../constants/testSample';
import App, { EAppTestId } from './App';
import { EForecastCardTestId } from '../../components/ForecastCard/ForecastCard';
import { EForecastItemTestId } from '../../components/ForecastItem/ForecastItem';

const fetchMock = (_fetch as unknown) as typeof _fetchMock;

const mockNormalApi = () => {
  const ipLocMatcher = /check/;
  const locMather = /api\/location\/search\/\?query=/;
  const weathMatcher = /api\/location\/\d+/;
  const ipLocJSON = JSON.stringify(ipLocSample);
  const locSampleJSON = JSON.stringify(locSample);
  const locWeatherSampleJSON = JSON.stringify(locWeatherSample);
  fetchMock.mock(ipLocMatcher, {
    status: 200,
    body: ipLocJSON,
  });
  fetchMock.mock(locMather, {
    status: 200,
    body: locSampleJSON,
  });
  fetchMock.mock(weathMatcher, {
    status: 200,
    body: locWeatherSampleJSON,
  });
};

describe('App', () => {
  afterEach(() => {
    fetchMock.reset();
  });
  test('should match snapshot', async () => {
    mockNormalApi();
    const { asFragment, getByTestId } = render(<App />);
    await waitForElementToBeRemoved(() => getByTestId(EAppTestId.LOADER));
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render data correctly', async () => {
    mockNormalApi();
    const { getByTestId, getAllByTestId } = render(<App />);
    await waitForElementToBeRemoved(() => getByTestId(EAppTestId.LOADER));

    const TITLE = getByTestId(EForecastCardTestId.TITLE);
    const ITEMS = getAllByTestId(EForecastItemTestId.BUTTON);

    const expectedTitle = `${locWeatherSample.title} Weather`;

    expect(ITEMS).toHaveLength(locWeatherSample.consolidated_weather.length);
    expect(TITLE).toHaveTextContent(expectedTitle);
  });
});
