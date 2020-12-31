import React from 'react';
import { EApiMessages } from '../../constants/api';
import { fetchIpLoc, fetchLoc, fetchLocWeather } from '../../services/api';
import { IIPInfo, IWeatherLoc, IWeatherLocSearch } from '../../types';

export interface IFetchHandlerParams {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | undefined>>;
  callback?: CallableFunction;
}
export const fetchHandler = async ({
  setLoading,
  setErrorMsg,
  callback,
}: IFetchHandlerParams): Promise<void> => {
  setErrorMsg('');
  setLoading(true);

  try {
    if (callback && typeof callback === 'function') {
      await callback();
    }
  } catch (error) {
    setErrorMsg(error?.message);
  } finally {
    setLoading(false);
  }
};

export type DetectLocationParams = Omit<IFetchHandlerParams, 'callback'> & {
  setIPLoc: React.Dispatch<React.SetStateAction<IIPInfo | undefined>>;
};
export const detectLoc = async ({
  setLoading,
  setErrorMsg,
  setIPLoc,
}: DetectLocationParams): Promise<void> => {
  await fetchHandler({
    setLoading,
    setErrorMsg,
    callback: async () => {
      setIPLoc(await fetchIpLoc());
    },
  });
};

export type LoadDetectedLocationParams = Omit<
  IFetchHandlerParams,
  'callback'
> & {
  setCurrentLoc: React.Dispatch<
    React.SetStateAction<IWeatherLocSearch | undefined>
  >;
  city: string;
  ip: string;
};
export const loadDetectedLocation = async ({
  setLoading,
  setErrorMsg,
  setCurrentLoc,
  city,
  ip,
}: LoadDetectedLocationParams): Promise<void> => {
  await fetchHandler({
    setLoading,
    setErrorMsg,
    callback: async () => {
      const locations = await fetchLoc({ queryName: city });

      if (!locations?.length)
        throw new Error(
          `Cannot found forecast report for detected location: ${city} - from IP: ${ip}.\n Please try to use search.`
        );

      setCurrentLoc(locations[0]);
    },
  });
};

export type FetchCurrentLocWeatherParams = Omit<
  IFetchHandlerParams,
  'callback'
> & {
  setWeather: React.Dispatch<React.SetStateAction<IWeatherLoc | undefined>>;
  woeid: number;
};
export const fetchCurrentLocWeather = async ({
  setLoading,
  setErrorMsg,
  setWeather,
  woeid,
}: FetchCurrentLocWeatherParams): Promise<void> => {
  await fetchHandler({
    setErrorMsg,
    setLoading,
    callback: async () => {
      const weather = await fetchLocWeather({ woeid });
      setWeather(weather);
    },
  });
};

export type OnSearchParams = Omit<IFetchHandlerParams, 'callback'> & {
  setWeather: React.Dispatch<React.SetStateAction<IWeatherLoc | undefined>>;
};
export const onSearch = ({
  setLoading,
  setErrorMsg,
  setWeather,
}: OnSearchParams) => async (
  event: React.FormEvent<HTMLInputElement>
): Promise<void> => {
  await fetchHandler({
    setLoading,
    setErrorMsg,
    callback: async () => {
      const queryName = event.currentTarget.value;
      console.log(
        '🚀 ~ file: logic.ts ~ line 118 ~ callback: ~ queryName',
        queryName
      );

      if (!queryName) return;

      const locations = await fetchLoc({ queryName });
      if (!locations?.length) throw new Error(EApiMessages.NOT_FOUND);

      const firstLocWoeId = locations[0]?.woeid;
      if (!firstLocWoeId) throw new Error(EApiMessages.NOT_FOUND);

      const weather = await fetchLocWeather({ woeid: firstLocWoeId });
      setWeather(weather);
    },
  });
};
