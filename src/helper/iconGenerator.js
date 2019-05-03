export function getIcon(weatherStatus) {
  let iconStr;
  switch (weatherStatus) {
    case 'Clear':
      iconStr = 'day-sunny';
      break;
    case 'Clouds':
      iconStr = 'day-cloudy';
      break;
    case 'Rain':
      iconStr = 'day-rain';
      break;
    case 'Snow':
      iconStr = 'day-snow';
      break;
    case 'Drizzle':
      iconStr = 'day-sprinkle';
      break;
    case 'Thunderstorm':
      iconStr = 'day-thunderstorm';
      break;
    case 'Fog':
      iconStr = 'day-fog';
      break;
    case 'Haze':
    case 'Mist':
    case 'Dust':
      iconStr = 'dust';
      break;
    case 'Extreme':
      iconStr = 'tornado';
      break;
    default:
      iconStr = 'cloud';
      break;
  }

  return iconStr;
}
