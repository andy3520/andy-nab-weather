import React from 'react';
import { WEATHER_STATES } from '../../constants/weather';
import { DisplayWeatherDetail, IWeatherLoc } from '../../types';
import { getRoundNum } from '../../utils/getRoundNum';
import { getWeekDay } from '../../utils/getWeekDay';

export interface IForecastCardProps {
  currentWeatherIndex: number;
  weather: IWeatherLoc | undefined;
}

export enum EForecastCardTestId {
  TITLE = 'ForecastCard_TITLE',
  DATE = 'ForecastCard_DATE',
  WEEK_DAY = 'ForecastCard_WEEK_DAY',
  THE_TEMP = 'ForecastCard_THE_TEMP',
  MIN_TEMP = 'ForecastCard_MIN_TEMP',
  MAX_TEMP = 'ForecastCard_MAX_TEMP',
  IMAGE = 'ForecastCard_IMAGE',
}

const ForecastCard: React.FC<IForecastCardProps> = ({
  currentWeatherIndex,
  weather,
}) => {
  if (!weather) return null;

  const currentWeather: DisplayWeatherDetail =
    weather?.consolidated_weather?.[currentWeatherIndex];

  const { title: location } = weather;
  const {
    applicable_date,
    max_temp,
    min_temp,
    the_temp,
    weather_state_abbr,
  } = currentWeather;
  const weatherState = WEATHER_STATES?.[weather_state_abbr];

  return (
    <div className="px-4 py-5 rounded-lg shadow bg-gradient-to-br sm:bg-gradient-to-r from-indigo-600 to-blue-500 sm:px-6">
      <div className="flex flex-wrap items-center justify-center sm:justify-between">
        <div className="flex-1 text-white md:pr-6">
          <h2
            className="text-lg font-semibold sm:text-xl"
            data-testid={EForecastCardTestId.TITLE}
          >
            {location} Weather
          </h2>
          <p className="text-base text-gray-100 sm:text-lg">
            <span data-testid={EForecastCardTestId.WEEK_DAY}>
              {getWeekDay(applicable_date)}
            </span>{' '}
            -{' '}
            <span data-testid={EForecastCardTestId.DATE}>
              {applicable_date}
            </span>
          </p>
          <p className="font-bold uppercase text-7xl sm:text-9xl">
            <span data-testid={EForecastCardTestId.THE_TEMP}>
              {getRoundNum(the_temp)}
            </span>
            °
          </p>
          <p className="text-xl font-semibold text-gray-100 sm:text-2xl">
            <span data-testid={EForecastCardTestId.MIN_TEMP}>
              {getRoundNum(min_temp)}
            </span>
            ° &#8644;{' '}
            <span data-testid={EForecastCardTestId.MAX_TEMP}>
              {getRoundNum(max_temp)}
            </span>
            °
          </p>
        </div>
        <img
          data-testid={EForecastCardTestId.IMAGE}
          src={`/static/images/weather/${weather_state_abbr}.svg`}
          title={weatherState}
          alt={`${weatherState} icon`}
          className="w-20 h-20 mt-6 sm:w-40 sm:h-40 sm:mt-0 animate-pulse"
        />
      </div>
    </div>
  );
};

export default ForecastCard;
