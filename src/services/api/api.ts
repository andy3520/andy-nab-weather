import fetch from 'isomorphic-fetch';
import { EHTTPStatus, EApiMessages } from '../../constants/api';
import { IIPInfo, IWeatherLoc, IWeatherLocSearch } from '../../types';

const ROOT_URL = process.env.REACT_APP_ROOT_URL;
const IP_ACCESS = process.env.REACT_APP_IP_ACCESS;

export const fetchIpLoc = async (): Promise<IIPInfo> => {
  const res = await fetch(`${ROOT_URL}/check?access_key=${IP_ACCESS}`);
  if (res.status === EHTTPStatus.OK) {
    return res.json();
  }

  if (res.status === EHTTPStatus.LIMIT_EXCEED)
    throw new Error(EApiMessages.LIMIT_EXCEED);

  if (res.status === EHTTPStatus.NOT_FOUND)
    throw new Error(EApiMessages.NOT_FOUND);

  throw new Error(EApiMessages.DEFAULT);
};

export const fetchLoc = async ({
  queryName,
}: {
  queryName: string;
}): Promise<IWeatherLocSearch[]> => {
  const res = await fetch(
    `${ROOT_URL}/api/location/search/?query=${queryName}`
  );

  if (res.status === EHTTPStatus.OK) {
    return res.json();
  }

  throw new Error(EApiMessages.DEFAULT);
};

export const fetchLocWeather = async ({
  woeid,
}: {
  woeid: number;
}): Promise<IWeatherLoc> => {
  if (!woeid) throw new Error(EApiMessages.NOT_FOUND);

  const res = await fetch(`${ROOT_URL}/api/location/${woeid}/`);

  if (res.status === EHTTPStatus.OK) {
    return res.json();
  }

  if (res.status === EHTTPStatus.NOT_FOUND)
    throw new Error(EApiMessages.NOT_FOUND);

  throw new Error(EApiMessages.DEFAULT);
};
