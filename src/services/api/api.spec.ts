import _fetch from 'isomorphic-fetch';
import _fetchMock from 'fetch-mock';
import { fetchIpLoc, fetchLoc, fetchLocWeather } from './api';
import { EApiMessages } from '../../constants/api';
import {
  ipLocSample,
  locSample,
  locWeatherSample,
} from '../../constants/testSample';

const fetchMock = (_fetch as unknown) as typeof _fetchMock;

describe('api', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  describe('fetchIpLoc', () => {
    const matcher = /check/;
    test('should detected Ho chi minh city as location', async () => {
      const ipLocJSON = JSON.stringify(ipLocSample);
      fetchMock.mock(matcher, {
        status: 200,
        body: ipLocJSON,
      });
      const response = await fetchIpLoc();
      expect(response.city).toEqual(ipLocSample.city);
    });
    test('should throw limit exceed error', async () => {
      fetchMock.mock(matcher, {
        status: 104,
      });
      await expect(fetchIpLoc()).rejects.toThrow(EApiMessages.LIMIT_EXCEED);
    });
    test('should throw not found error', async () => {
      fetchMock.mock(matcher, {
        status: 404,
      });
      await expect(fetchIpLoc()).rejects.toThrow(EApiMessages.NOT_FOUND);
    });
    test('should throw default error', async () => {
      fetchMock.mock(matcher, {
        status: 500,
      });
      await expect(fetchIpLoc()).rejects.toThrow(EApiMessages.DEFAULT);
    });
  });

  describe('fetchLoc', () => {
    const mather = /api\/location\/search\/\?query=/;
    test('should return Ho chi minh city detail', async () => {
      const locSampleJSON = JSON.stringify(locSample);
      const { city: queryName } = ipLocSample;
      fetchMock.mock(mather, {
        status: 200,
        body: locSampleJSON,
      });
      const response = await fetchLoc({ queryName });
      expect(response).toEqual(locSample);
    });
    test('should throw default error', async () => {
      fetchMock.mock(mather, {
        status: 500,
      });
      await expect(
        fetchLoc({
          queryName:
            'Ad cupidatat tempor mollit minim dolor duis nulla incididunt.',
        })
      ).rejects.toThrow(EApiMessages.DEFAULT);
    });
    test('should return empty result', async () => {
      fetchMock.mock(mather, {
        status: 200,
        body: JSON.stringify([]),
      });
      const response = await fetchLoc({ queryName: 'Some where not exist' });
      expect(response).toEqual([]);
    });
  });

  describe('fetchLocWeather', () => {
    const matcher = /api\/location\/\d+/;
    test('should return Ho chi minh city forecast', async () => {
      const locWeatherSampleJSON = JSON.stringify(locWeatherSample);
      const { woeid } = locSample[0];
      fetchMock.mock(matcher, {
        status: 200,
        body: locWeatherSampleJSON,
      });
      const response = await fetchLocWeather({ woeid });
      expect(response).toEqual(locWeatherSample);
    });
    test('should throw not found error', async () => {
      const fakeWoeid = 9999999;
      fetchMock.mock(matcher, {
        status: 404,
      });

      await expect(fetchLocWeather({ woeid: fakeWoeid })).rejects.toThrow(
        EApiMessages.NOT_FOUND
      );
    });

    test('should throw not found when params is undefined error', async () => {
      const fakeWoeid = undefined;
      fetchMock.mock(matcher, {
        status: 404,
      });

      await expect(fetchLocWeather({ woeid: fakeWoeid })).rejects.toThrow(
        EApiMessages.NOT_FOUND
      );
    });
    test('should throw default error', async () => {
      const fakeWoeid = 9999999;
      fetchMock.mock(matcher, {
        status: 500,
      });

      await expect(fetchLocWeather({ woeid: fakeWoeid })).rejects.toThrow(
        EApiMessages.DEFAULT
      );
    });
  });
});
