import React from 'react';
import './App.scss';
import { ReactComponent as GithubIcon } from './github.svg';
import { ReactComponent as TwitterIcon } from './twitter.svg';
import { ReactComponent as LoaderIcon } from './loader.svg';
import ForecastCard from '../../components/ForecastCard';
import ForecastList from '../../components/ForecastList';
import LocationSearch from '../../components/LocationSearch';
import Notify from '../../components/Notify';
import { IIPInfo, IWeatherLoc, IWeatherLocSearch } from '../../types';
import { EApiMessages } from '../../constants/api';
import {
  detectLoc,
  fetchCurrentLocWeather,
  loadDetectedLocation,
  onSearch,
} from './app.func';

export enum EAppTestId {
  LOADER = 'App_LOADER',
}

const App: React.FC = () => {
  const [ipLoc, setIPLoc] = React.useState<IIPInfo>();
  const [currentLoc, setCurrentLoc] = React.useState<IWeatherLocSearch>();
  const [weather, setWeather] = React.useState<IWeatherLoc>();
  const [currentWeatherIndex, setCurrentWeatherIndex] = React.useState<number>(
    0
  );

  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [errorMsg, setErrorMsg] = React.useState<string>();
  const [notifyType, setNotifyType] = React.useState<'info' | 'error'>();
  const [notifyMsg, setNotifyMsg] = React.useState<string>();

  React.useEffect(() => {
    detectLoc({
      setLoading,
      setErrorMsg,
      setIPLoc,
    });
  }, []);

  React.useEffect(() => {
    if (!ipLoc?.city || !ipLoc?.ip) {
      setNotifyType('info');
      setNotifyMsg(EApiMessages.CANNOT_DETECT_LOCATION);
      return;
    }

    setNotifyType('info');
    setNotifyMsg(`Detected location: ${ipLoc.city} from ip ${ipLoc.ip}`);
    loadDetectedLocation({
      setLoading,
      setErrorMsg,
      setCurrentLoc,
      setNotifyMsg,
      city: ipLoc.city,
      ip: ipLoc.ip,
    });
  }, [ipLoc]);

  React.useEffect(() => {
    if (currentLoc?.woeid) {
      fetchCurrentLocWeather({
        setLoading,
        setErrorMsg,
        setWeather,
        woeid: currentLoc?.woeid,
      });

      setCurrentWeatherIndex(0);
    }
  }, [currentLoc]);

  React.useEffect(() => {
    setNotifyType('error');
    setNotifyMsg(errorMsg);
  }, [errorMsg]);

  return (
    <div className="bg-gray-500">
      <div className="container">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-4xl overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow">
            <header className="flex items-center justify-between px-4 py-5 sm:px-6">
              <h1 className="font-mono text-xl font-bold tracking-wider uppercase">
                Andy&apos;s Forecast
              </h1>
              <LocationSearch
                onSearch={onSearch({
                  setLoading,
                  setErrorMsg,
                  setWeather,
                  setNotifyMsg,
                })}
              />
            </header>
            <div className="px-4 py-5 sm:p-6">
              {notifyMsg && (
                <div className="mb-4">
                  <Notify type={notifyType} msg={notifyMsg} />
                </div>
              )}

              {isLoading && (
                <LoaderIcon
                  data-testid={EAppTestId.LOADER}
                  className="w-20 h-20 text-indigo-600 animate-spin"
                />
              )}

              {weather && (
                <ForecastCard
                  currentWeatherIndex={currentWeatherIndex}
                  weather={weather}
                />
              )}

              {weather && (
                <div className="mt-4 sm:mt-6">
                  <ForecastList
                    weather={weather}
                    setCurrentWeatherIndex={setCurrentWeatherIndex}
                  />
                </div>
              )}
            </div>
            <footer className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="font-mono text-sm font-semibold">
                  NAB Assignment by Andy Nguyen with ❤️
                </div>
                <div className="flex">
                  <a
                    href="https://twitter.com/annguyenhieuduc"
                    className="mr-4 text-gray-400 hover:text-gray-500"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sr-only">Twitter</span>
                    <TwitterIcon className="w-6 h-6" />
                  </a>

                  <a
                    href="https://github.com/andy3520/andy-nab-weather"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">GitHub</span>
                    <GithubIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
