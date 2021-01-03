import { FormEvent } from 'react';
import _fetch from 'isomorphic-fetch';
import _fetchMock from 'fetch-mock';
import {
  fetchHandler,
  detectLoc,
  loadDetectedLocation,
  fetchCurrentLocWeather,
  onSearch,
} from './app.func';
import {
  ipLocSample,
  locSample,
  locWeatherSample,
} from '../../constants/testSample';

const fetchMock = (_fetch as unknown) as typeof _fetchMock;

describe('app.func', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  const setLoadingMock = jest.fn();
  const setErrorMsgMock = jest.fn();
  const setNotifyMsgMock = jest.fn();
  const setWeatherMock = jest.fn();

  describe('fetchHandler', () => {
    const callbackMock = jest.fn();
    test('should invoke callback correctly', async () => {
      const result = await fetchHandler({
        setLoading: setLoadingMock,
        setErrorMsg: setErrorMsgMock,
        callback: callbackMock,
      });

      expect(setLoadingMock).toBeCalledTimes(2);
      expect(setErrorMsgMock).toBeCalledTimes(1);
      expect(callbackMock).toBeCalledTimes(1);
      expect(result).toEqual(1);
    });

    test('should not invoke callback when passing wrong params', async () => {
      const result = await fetchHandler({
        setLoading: setLoadingMock,
        setErrorMsg: setErrorMsgMock,
        callback: ("I'm not a func" as unknown) as CallableFunction,
      });

      expect(setLoadingMock).toBeCalledTimes(2);
      expect(setErrorMsgMock).toBeCalledTimes(1);
      expect(result).toEqual(0);
    });

    test("should call setErrorMsg callback 2 times when there's any error", async () => {
      const errorCallbackMock = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      const result = await fetchHandler({
        setLoading: setLoadingMock,
        setErrorMsg: setErrorMsgMock,
        callback: errorCallbackMock,
      });

      expect(setLoadingMock).toBeCalledTimes(2);
      expect(setErrorMsgMock).toBeCalledTimes(2);
      expect(errorCallbackMock).toBeCalledTimes(1);
      expect(result).toEqual(0);
    });
  });

  describe('detectLoc', () => {
    test('should invoke callback correctly', async () => {
      const setIPLocMock = jest.fn();
      const matcher = /check/;
      fetchMock.mock(matcher, {
        status: 200,
        body: JSON.stringify(ipLocSample),
      });
      await detectLoc({
        setLoading: setLoadingMock,
        setErrorMsg: setErrorMsgMock,
        setIPLoc: setIPLocMock,
      });

      expect(setLoadingMock).toBeCalledTimes(2);
      expect(setErrorMsgMock).toBeCalledTimes(1);
      expect(setIPLocMock).toBeCalledTimes(1);
    });
  });

  describe('loadDetectedLocation', () => {
    test('should invoke callback correctly', async () => {
      const mather = /api\/location\/search\/\?query=/;
      const locSampleJSON = JSON.stringify(locSample);
      fetchMock.mock(mather, {
        status: 200,
        body: locSampleJSON,
      });
      const setCurrentLocMock = jest.fn();
      await loadDetectedLocation({
        setLoading: setLoadingMock,
        setErrorMsg: setErrorMsgMock,
        setCurrentLoc: setCurrentLocMock,
        setNotifyMsg: setNotifyMsgMock,
        city: ipLocSample.city,
        ip: ipLocSample.ip,
      });

      expect(setLoadingMock).toBeCalledTimes(2);
      expect(setErrorMsgMock).toBeCalledTimes(1);
      expect(setCurrentLocMock).toBeCalledTimes(1);
      expect(setNotifyMsgMock).toBeCalledTimes(0);
    });

    test('should invoke setNotifyMsg 1 times', async () => {
      const mather = /api\/location\/search\/\?query=/;
      const locSampleJSON = JSON.stringify([]);
      fetchMock.mock(mather, {
        status: 200,
        body: locSampleJSON,
      });
      const setCurrentLocMock = jest.fn();
      await loadDetectedLocation({
        setLoading: setLoadingMock,
        setErrorMsg: setErrorMsgMock,
        setCurrentLoc: setCurrentLocMock,
        setNotifyMsg: setNotifyMsgMock,
        city: '',
        ip: '',
      });

      expect(setLoadingMock).toBeCalledTimes(2);
      expect(setErrorMsgMock).toBeCalledTimes(1);
      expect(setCurrentLocMock).toBeCalledTimes(1);
      expect(setNotifyMsgMock).toBeCalledTimes(1);
    });
  });

  describe('fetchCurrentLocWeather', () => {
    const matcher = /api\/location\/\d+/;
    test('should invoke callback correctly', async () => {
      const locWeatherSampleJSON = JSON.stringify(locWeatherSample);
      const { woeid } = locSample[0];
      fetchMock.mock(matcher, {
        status: 200,
        body: locWeatherSampleJSON,
      });
      await fetchCurrentLocWeather({
        setErrorMsg: setErrorMsgMock,
        setLoading: setLoadingMock,
        setWeather: setWeatherMock,
        woeid,
      });

      expect(setErrorMsgMock).toBeCalledTimes(1);
      expect(setLoadingMock).toBeCalledTimes(2);
      expect(setWeatherMock).toBeCalledTimes(1);
    });
  });

  describe('onSearch', () => {
    const locMather = /api\/location\/search\/\?query=/;
    const weatherMatcher = /api\/location\/\d+/;
    test('should invoke callback correctly', async () => {
      const locSampleJSON = JSON.stringify(locSample);
      const locWeatherSampleJSON = JSON.stringify(locWeatherSample);
      fetchMock.mock(locMather, {
        status: 200,
        body: locSampleJSON,
      });
      fetchMock.mock(weatherMatcher, {
        status: 200,
        body: locWeatherSampleJSON,
      });
      const onSearchEvent = onSearch({
        setErrorMsg: setErrorMsgMock,
        setLoading: setLoadingMock,
        setNotifyMsg: setNotifyMsgMock,
        setWeather: setWeatherMock,
      });
      await onSearchEvent(({
        target: {
          value: 'Ho chi minh city',
        },
      } as unknown) as FormEvent<HTMLInputElement>);

      expect(setErrorMsgMock).toBeCalledTimes(1);
      expect(setLoadingMock).toBeCalledTimes(2);
      expect(setNotifyMsgMock).toBeCalledTimes(1);
      expect(setWeatherMock).toBeCalledTimes(2);
    });

    test('should not run callback with empty query', async () => {
      const locSampleJSON = JSON.stringify(locSample);
      const locWeatherSampleJSON = JSON.stringify(locWeatherSample);
      fetchMock.mock(locMather, {
        status: 200,
        body: locSampleJSON,
      });
      fetchMock.mock(weatherMatcher, {
        status: 200,
        body: locWeatherSampleJSON,
      });
      const onSearchEvent = onSearch({
        setErrorMsg: setErrorMsgMock,
        setLoading: setLoadingMock,
        setNotifyMsg: setNotifyMsgMock,
        setWeather: setWeatherMock,
      });
      await onSearchEvent(({
        target: {
          value: '',
        },
      } as unknown) as FormEvent<HTMLInputElement>);

      expect(setErrorMsgMock).toBeCalledTimes(1);
      expect(setLoadingMock).toBeCalledTimes(2);
      expect(setNotifyMsgMock).toBeCalledTimes(1);
      expect(setWeatherMock).toBeCalledTimes(0);
    });

    test('should throw error and setErrorMsg 2 times if search location not exist', async () => {
      const locSampleJSON = JSON.stringify([]);
      fetchMock.mock(locMather, {
        status: 200,
        body: locSampleJSON,
      });
      fetchMock.mock(weatherMatcher, {
        status: 200,
        body: null,
      });
      const onSearchEvent = onSearch({
        setErrorMsg: setErrorMsgMock,
        setLoading: setLoadingMock,
        setNotifyMsg: setNotifyMsgMock,
        setWeather: setWeatherMock,
      });

      await onSearchEvent(({
        target: {
          value: 'Imagine location',
        },
      } as unknown) as FormEvent<HTMLInputElement>);

      expect(setErrorMsgMock).toBeCalledTimes(2);
      expect(setLoadingMock).toBeCalledTimes(2);
      expect(setNotifyMsgMock).toBeCalledTimes(1);
      expect(setWeatherMock).toBeCalledTimes(1);
    });

    test('should throw error and setErrorMsg 2 times if woeid is undefined', async () => {
      const locationWithEmptyWoeid = { ...locSample[0] };
      locationWithEmptyWoeid.woeid = undefined;
      const locSampleJSON = JSON.stringify([locationWithEmptyWoeid]);
      fetchMock.mock(locMather, {
        status: 200,
        body: locSampleJSON,
      });
      fetchMock.mock(weatherMatcher, {
        status: 200,
        body: null,
      });
      const onSearchEvent = onSearch({
        setErrorMsg: setErrorMsgMock,
        setLoading: setLoadingMock,
        setNotifyMsg: setNotifyMsgMock,
        setWeather: setWeatherMock,
      });

      await onSearchEvent(({
        target: {
          value: 'Imagine location',
        },
      } as unknown) as FormEvent<HTMLInputElement>);

      expect(setErrorMsgMock).toBeCalledTimes(2);
      expect(setLoadingMock).toBeCalledTimes(2);
      expect(setNotifyMsgMock).toBeCalledTimes(1);
      expect(setWeatherMock).toBeCalledTimes(1);
    });
  });
});
