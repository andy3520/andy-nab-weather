import React from 'react';
import { IConsolidatedWeather, IWeatherLoc } from '../../types';
import ForecastItem from '../ForecastItem';

export interface IForecastListProps {
  weather: IWeatherLoc | undefined;
  setCurrentWeatherIndex: React.Dispatch<React.SetStateAction<number>>;
}

export enum EForecastListTestId {
  ITEM = 'ForecastList_ITEM',
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
  if (!weather) return null;

  const consolidatedWeathers = weather?.consolidated_weather;

  return (
    <div
      className="grid items-center justify-between gap-4 sm:gap-6"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(7rem, 1fr))',
      }}
    >
      {consolidatedWeathers?.map(
        (consolidatedWeather: IConsolidatedWeather, idx: number) => (
          <div
            key={consolidatedWeather.id}
            data-testid={EForecastListTestId.ITEM}
          >
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
