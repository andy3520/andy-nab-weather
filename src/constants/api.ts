export const ROOT_URL = process.env.REACT_APP_ROOT_URL;

export enum EHTTPStatus {
  OK = 200,
  NOT_FOUND = 404,
  LIMIT_EXCEED = 104,
}

export enum EApiMessages {
  DEFAULT = "Couldn't fetch weather data!",
  NOT_FOUND = 'Location not found',
  LIMIT_EXCEED = 'Detect Location API exceed limit. Please use search.',
  CANNOT_DETECT_LOCATION = "Couldn't detect your location by ip address, try to search you location!",
}
