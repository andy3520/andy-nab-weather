import React from 'react';
import { IConsolidatedWeather, IWeatherLoc } from '../../types';
import ForecastItem from '../ForecastItem';

export interface IForecastListProps {
  weather: IWeatherLoc;
  setCurrentWeatherIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const onChangeCurrentWeatherIndex = (
  index: number,
  setCurrentWeatherIndex: React.Dispatch<React.SetStateAction<number>>
) => (): void => {
  setCurrentWeatherIndex(index);
};

const ForecastList: React.FC<IForecastListProps> = ({
  weather,
  setCurrentWeatherIndex,
}) => {
  const consolidatedWeathers = weather?.consolidated_weather;

  if (!consolidatedWeathers) return null;

  return (
    <div className="flex flex-wrap items-center justify-between -m-2">
      {consolidatedWeathers?.map(
        (consolidatedWeather: IConsolidatedWeather, idx: number) => (
          <div className="p-2" key={consolidatedWeather.id}>
            <ForecastItem
              onChangeCurrentWeatherIndex={onChangeCurrentWeatherIndex(
                idx,
                setCurrentWeatherIndex
              )}
              consolidatedWeather={consolidatedWeather}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ForecastList;
