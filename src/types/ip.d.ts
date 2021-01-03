export interface IIPInfo {
  ip: string | null;
  hostname?: string | null;
  type: string | null;
  continent_code: string | null;
  continent_name: string | null;
  country_code: string | null;
  country_name: string | null;
  region_code: string | null;
  region_name: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  location: IIPLoc | null;
  zip: string | null;
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
