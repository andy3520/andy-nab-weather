import React from 'react';
import { WEATHER_STATES } from '../../constants/weather';
import { DisplayWeatherDetail, IWeatherLoc } from '../../types';
import { getRoundNum } from '../../utils/getRoundNum';
import { getWeekDay } from '../../utils/getWeekDay';

export interface IForecastCardProps {
  currentWeatherIndex: number;
  weather: IWeatherLoc;
}

const ForecastCard: React.FC<IForecastCardProps> = ({
  currentWeatherIndex,
  weather,
}) => {
  const currentWeather: DisplayWeatherDetail =
    weather?.consolidated_weather?.[currentWeatherIndex];

  if (!currentWeather) return null;

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
          <h2 className="text-lg font-semibold sm:text-xl">
            {location} Weather
          </h2>
          <p className="text-base text-gray-100 sm:text-lg">
            {getWeekDay(applicable_date)} - {applicable_date}
          </p>
          <p className="font-bold uppercase text-7xl sm:text-9xl">
            {getRoundNum(the_temp)}°
          </p>
          <p className="text-xl font-semibold text-gray-100 sm:text-2xl">
            {getRoundNum(min_temp)}° &#8644; {getRoundNum(max_temp)}°
          </p>
        </div>
        <img
          src={`/static/images/weather/${weather_state_abbr}.svg`}
          title={weatherState}
          alt={`${weatherState} svg icon`}
          className="w-20 h-20 mt-6 sm:w-40 sm:h-40 sm:mt-0 animate-pulse"
        />
      </div>
    </div>
  );
};

export default ForecastCard;
