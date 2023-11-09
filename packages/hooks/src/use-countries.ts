import type { ICountry } from 'country-state-city';
import { Country } from 'country-state-city';
import { useMemo } from 'react';

export function useCountries(): {
  countries: ICountry[];
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

  return {
    countries,
  };
}
