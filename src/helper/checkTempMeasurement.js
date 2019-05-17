export function checkTempMeasurement(country) {
  const fahrenheitCountries = /united states|bahamas|belize|cayman islands|palau|puerto rico|guam|u.s. virgin islands/i;
  return fahrenheitCountries.test(country);
}
