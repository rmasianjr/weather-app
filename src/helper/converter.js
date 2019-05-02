const toFahrenheit = temperature =>
  (parseFloat(temperature) * (9 / 5) + 32).toFixed(1);

const toCelsius = temperature =>
  ((parseFloat(temperature) - 32) * (5 / 9)).toFixed(1);

export { toFahrenheit, toCelsius };
