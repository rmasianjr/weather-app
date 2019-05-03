function checkTime(hour) {
  if (hour < 6 || hour > 18) {
    return 'night-alt';
  }
  return 'day';
}

export function getIcon(weatherStatus) {
  const today = checkTime(new Date().getHours());
  let iconStr;

  switch (weatherStatus) {
    case 'Clear':
      iconStr = today === 'day' ? 'day-sunny' : 'night-clear';
      break;
    case 'Clouds':
      iconStr = `${today}-cloudy`;
      break;
    case 'Rain':
      iconStr = `${today}-rain`;
      break;
    case 'Snow':
      iconStr = `${today}-snow`;
      break;
    case 'Drizzle':
      iconStr = `${today}-sprinkle`;
      break;
    case 'Thunderstorm':
      iconStr = `${today}-thunderstorm`;
      break;
    case 'Fog':
      iconStr = `${today.replace(/-alt$/, '')}-fog`;
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
