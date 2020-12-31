export interface IIPInfo {
  ip: string;
  hostname: string;
  type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  latitude: number;
  longitude: number;
  location: IIPLoc;
  zip: string;
}

export interface IIPLoc {
  geoname_id: number;
  capital: string;
  languages: Array<IIPLang>;
  country_flag: string;
  country_flag_emoji: string;
  country_flag_emoji_unicode: string;
  calling_code: string;
  is_eu: boolean;
}

export interface IIPLang {
  code: string;
  name: string;
  native: string;
}
