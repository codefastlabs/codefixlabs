import type { ICity, ICountry, IState } from 'country-state-city';
import { City, Country, State } from 'country-state-city';
import { useMemo } from 'react';

export function useCountries(): {
  countries: ICountry[];
  getStatesOfCountry: (countryCode: string) => IState[];
  getCitiesOfState: (countryCode: string, stateCode: string) => ICity[];
} {
  const countries = useMemo<ICountry[]>(
    () =>
      Country.getAllCountries().map((country) => ({
        ...country,
        phonecode: country.phonecode.startsWith('+')
          ? country.phonecode
          : `+${country.phonecode}`,
      })),
    [],
  );

  const getStatesOfCountry = (countryCode: string): IState[] => {
    return State.getStatesOfCountry(countryCode);
  };

  const getCitiesOfState = (
    countryCode: string,
    stateCode: string,
  ): ICity[] => {
    return City.getCitiesOfState(countryCode, stateCode);
  };

  return {
    countries,
    getCitiesOfState,
    getStatesOfCountry,
  };
}
