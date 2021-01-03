export interface IWeatherLocSearch {
  title: string;
  location_type: string;
  latt_long: string;
  woeid: number;
}

export interface IWeatherLoc {
  woeid: number;
  title: string;
  location_type: string;
  latt_long: string;
  time: string;
  sun_rise: string;
  sun_set: string;
  timezone_name: string;
  parent: IParent;
  consolidated_weather: Array<IConsolidatedWeather>;
  sources: ISource[];
  timezone: string;
}

export interface IParent {
  woeid: number;
  title: string;
  location_type: string;
  latt_long: string;
}

export type WeatherStateAbbr =
  | 'sn'
  | 'sl'
  | 'h'
  | 't'
  | 'hr'
  | 'lr'
  | 's'
  | 'hc'
  | 'lc'
  | 'c';

export interface IConsolidatedWeather {
  id: number;
  applicable_date: string;
  weather_state_name: string;
  weather_state_abbr: WeatherStateAbbr;
  wind_speed: number;
  wind_direction: number;
  wind_direction_compass: string;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
  created: string;
}

export interface ISource {
  title: string;
  url: string;
  slug: string;
  crawl_rate: number;
}

export type DisplayWeatherDetail = Pick<
  IConsolidatedWeather,
  | 'applicable_date'
  | 'the_temp'
  | 'min_temp'
  | 'max_temp'
  | 'weather_state_abbr'
>;
