import React from 'react';
import { WEATHER_STATES } from '../../constants/weather';
import { DisplayWeatherDetail, IConsolidatedWeather } from '../../types';
import { getRoundNum } from '../../utils/getRoundNum';
import { getWeekDay } from '../../utils/getWeekDay';

export interface IForecastItemProps {
  onChangeCurrentWeatherIndex: () => void;
  consolidatedWeather: IConsolidatedWeather | undefined;
}

export enum EForecastItemTestId {
  BUTTON = 'ForecastItem_BUTTON',
  DATE = 'ForecastItem_DATE',
  WEEK_DAY = 'ForecastItem_WEEK_DAY',
  THE_TEMP = 'ForecastItem_THE_TEMP',
  MIN_TEMP = 'ForecastItem_MIN_TEMP',
  MAX_TEMP = 'ForecastItem_MAX_TEMP',
  IMAGE = 'ForecastItem_IMAGE',
}

const ForecastItem: React.FC<IForecastItemProps> = ({
  onChangeCurrentWeatherIndex,
  consolidatedWeather,
}) => {
  if (!consolidatedWeather) return null;

  const {
    applicable_date,
    max_temp,
    min_temp,
    the_temp,
    weather_state_abbr,
  }: DisplayWeatherDetail = consolidatedWeather;

  const weatherState = WEATHER_STATES?.[weather_state_abbr];
  const srcWeatherIcon = `/static/images/weather/${weather_state_abbr}.svg`;

  return (
    <button
      data-testid={EForecastItemTestId.BUTTON}
      onClick={onChangeCurrentWeatherIndex}
      type="button"
      className="flex-1 p-4 rounded-lg shadow bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-400 hover:to-blue-300 focus:from-indigo-400 focus: focus:to-blue-300 focus:ring-4 focus:ring-indigo-200 focus:outline-none"
    >
      <div className="flex flex-col items-center justify-center text-white">
        <p
          className="font-semibold text-gray-100"
          data-testid={EForecastItemTestId.WEEK_DAY}
        >
          {getWeekDay(applicable_date)}
        </p>
        <p
          className="text-xs text-gray-200"
          data-testid={EForecastItemTestId.DATE}
        >
          {applicable_date}
        </p>
        <div className="flex items-center justify-between">
          <p
            className="text-3xl font-bold"
            data-testid={EForecastItemTestId.THE_TEMP}
          >
            {getRoundNum(the_temp)}°
          </p>
          <img
            data-testid={EForecastItemTestId.IMAGE}
            title={weatherState}
            src={srcWeatherIcon}
            alt={`${weatherState} icon`}
            className="ml-2 w-7 h-7"
          />
        </div>
        <p className="text-sm text-gray-100">
          <span data-testid={EForecastItemTestId.MIN_TEMP}>
            {getRoundNum(min_temp)}
          </span>
          ° &#8644;{' '}
          <span data-testid={EForecastItemTestId.MAX_TEMP}>
            {getRoundNum(max_temp)}
          </span>
          °
        </p>
      </div>
    </button>
  );
};

export default ForecastItem;
